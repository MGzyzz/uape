from django import forms
from django.contrib import admin, messages
from django_ckeditor_5.widgets import CKEditor5Widget

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


class PlaylistAdminForm(forms.ModelForm):
    why_this_course = forms.CharField(
        required=False,
        widget=CKEditor5Widget(config_name='detail'),
        label='Почему этот курс?',
    )
    what_you_will_learn = forms.CharField(
        required=False,
        widget=CKEditor5Widget(config_name='detail'),
        label='Что вы узнаете?',
    )

    class Meta:
        model = Playlist
        fields = '__all__'


@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    form = PlaylistAdminForm
    list_display = ('title', 'youtube_id', 'video_count', 'channel')
    search_fields = ('title', 'youtube_id')
    filter_horizontal = ('tags',)
    readonly_fields = ('title', 'thumbnail_url', 'video_count', 'channel')
    fieldsets = (
        (None, {
            'fields': ('youtube_id', 'title', 'thumbnail_url', 'video_count', 'channel', 'tags'),
        }),
        ('Детальная страница', {
            'fields': ('description', 'language', 'lang', 'duration', 'why_this_course', 'what_you_will_learn'),
            'description': '''
                <table style="border-collapse:collapse;margin:8px 0 4px;font-size:13px;line-height:1.6;color:inherit">
                  <thead>
                    <tr>
                      <th style="text-align:left;padding:4px 24px 4px 0;font-weight:600;border-bottom:1px solid var(--border-color, #ccc);opacity:0.7">Поле</th>
                      <th style="text-align:left;padding:4px 0;font-weight:600;border-bottom:1px solid var(--border-color, #ccc);opacity:0.7">Как заполнять</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="padding:6px 24px 6px 0;font-family:monospace;opacity:0.85">language</td>
                      <td style="padding:6px 0;opacity:0.85">Название языка программирования: <b>Python</b>, <b>JavaScript</b>, <b>Java</b>… Подставляется в шаблон «About This Course».</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 24px 6px 0;font-family:monospace;opacity:0.85">why_this_course</td>
                      <td style="padding:6px 0;opacity:0.85">Используйте редактор: маркированный список, <b>жирный</b> для выделения ключевых слов.</td>
                    </tr>
                    <tr>
                      <td style="padding:6px 24px 6px 0;font-family:monospace;opacity:0.85">what_you_will_learn</td>
                      <td style="padding:6px 0;opacity:0.85">Используйте нумерованный список в редакторе.</td>
                    </tr>
                  </tbody>
                </table>
            ''',
        }),
    )

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

    class Media:
        css = {'all': ('admin/css/ckeditor_dark.css',)}
        js = ('admin/js/section_inline_toggle.js',)


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
