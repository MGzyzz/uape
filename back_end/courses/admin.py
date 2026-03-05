from django.contrib import admin, messages

from .models import Bookmark, Channel, Playlist, Section, Tag, Video
from .services.youtube import (
    extract_channel_id,
    extract_playlist_id,
    extract_video_id,
    fetch_channel,
    fetch_playlist,
    fetch_video,
)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')
    search_fields = ('name',)


@admin.register(Channel)
class ChannelAdmin(admin.ModelAdmin):
    list_display = ('name', 'youtube_id', 'subscribers')
    search_fields = ('name', 'youtube_id')
    filter_horizontal = ('tags',)
    readonly_fields = ('name', 'subscribers', 'avatar_url', 'description', 'url')

    def save_model(self, request, obj, form, change):
        if not change:  # only on creation
            channel_id = extract_channel_id(obj.youtube_id)
            if not channel_id:
                messages.error(request, 'Could not extract channel ID from the provided value.')
                return
            try:
                data = fetch_channel(channel_id)
                obj.youtube_id = channel_id
                obj.name = data['name']
                obj.subscribers = data['subscribers']
                obj.avatar_url = data['avatar_url']
                obj.description = data['description']
                obj.url = data['url']
            except Exception as e:
                messages.error(request, f'YouTube API error: {e}')
                return
        super().save_model(request, obj, form, change)


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('title', 'youtube_id', 'video_count', 'channel')
    search_fields = ('title', 'youtube_id')
    filter_horizontal = ('tags',)
    readonly_fields = ('title', 'thumbnail_url', 'video_count', 'channel')

    def save_model(self, request, obj, form, change):
        if not change:
            playlist_id = extract_playlist_id(obj.youtube_id)
            if not playlist_id:
                messages.error(request, 'Could not extract playlist ID.')
                return
            try:
                data = fetch_playlist(playlist_id)
                obj.youtube_id = playlist_id
                obj.title = data['title']
                obj.thumbnail_url = data['thumbnail_url']
                obj.video_count = data['video_count']

                # auto-link or create Channel
                channel_id = data['channel_id']
                channel, _ = Channel.objects.get_or_create(
                    youtube_id=channel_id,
                    defaults=self._fetch_channel_defaults(channel_id, request),
                )
                obj.channel = channel
            except Exception as e:
                messages.error(request, f'YouTube API error: {e}')
                return
        super().save_model(request, obj, form, change)

    @staticmethod
    def _fetch_channel_defaults(channel_id, request):
        try:
            data = fetch_channel(channel_id)
            return {
                'name': data['name'],
                'subscribers': data['subscribers'],
                'avatar_url': data['avatar_url'],
                'description': data['description'],
                'url': data['url'],
            }
        except Exception as e:
            messages.warning(request, f'Could not fetch channel data: {e}')
            return {'name': channel_id}


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'youtube_id', 'duration', 'channel')
    search_fields = ('title', 'youtube_id')
    filter_horizontal = ('tags',)
    readonly_fields = ('title', 'thumbnail_url', 'duration', 'channel')

    def save_model(self, request, obj, form, change):
        if not change:
            video_id = extract_video_id(obj.youtube_id)
            if not video_id:
                messages.error(request, 'Could not extract video ID.')
                return
            try:
                data = fetch_video(video_id)
                obj.youtube_id = video_id
                obj.title = data['title']
                obj.thumbnail_url = data['thumbnail_url']
                obj.duration = data['duration']

                channel_id = data['channel_id']
                channel, _ = Channel.objects.get_or_create(
                    youtube_id=channel_id,
                    defaults=PlaylistAdmin._fetch_channel_defaults(channel_id, request),
                )
                obj.channel = channel
            except Exception as e:
                messages.error(request, f'YouTube API error: {e}')
                return
        super().save_model(request, obj, form, change)


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'content_type', 'order')
    list_editable = ('order',)

    class Media:
        js = ('admin/js/section_inline_toggle.js',)


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_type', 'object_id', 'created_at')
    readonly_fields = ('user', 'content_type', 'object_id', 'created_at')
