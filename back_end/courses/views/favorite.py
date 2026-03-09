from django.db import models
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Bookmark, Channel, Playlist, Section, Video
from courses.serializers import ChannelSerializer, PlaylistSerializer, VideoSerializer


class FavoriteContentView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def _ordered_items(model, ids):
        if not ids:
            return []

        queryset = model.objects.all()
        if model is Playlist:
            queryset = queryset.select_related('channel').prefetch_related('tags')
        elif model is Video:
            queryset = queryset.select_related('channel').prefetch_related('tags')
        elif model is Channel:
            queryset = queryset.prefetch_related('tags')

        items_by_id = {item.id: item for item in queryset.filter(id__in=ids)}
        return [items_by_id[item_id] for item_id in ids if item_id in items_by_id]

    @staticmethod
    def _user_field(request):
        try:
            return request.user.onboarding.field or ''
        except AttributeError:
            return ''

    def _sections_queryset(self, request, ids_by_type):
        user_field = self._user_field(request)
        field_filter = (
            models.Q(field='') | models.Q(field=user_field)
            if user_field
            else models.Q(field='')
        )
        has_bookmarks = (
            models.Q(playlists__id__in=ids_by_type['playlist'])
            | models.Q(videos__id__in=ids_by_type['video'])
            | models.Q(channels__id__in=ids_by_type['channel'])
        )
        return (
            Section.objects
            .filter(field_filter & has_bookmarks)
            .distinct()
            .order_by('order')
            .prefetch_related(
                'playlists__channel', 'playlists__tags',
                'videos__channel', 'videos__tags',
                'channels__tags',
            )
        )

    @staticmethod
    def _ordered_section_items(items, order_map):
        return sorted(items, key=lambda item: order_map.get(item.id, 10 ** 9))

    def get(self, request):
        bookmarks = (
            Bookmark.objects
            .filter(user=request.user)
            .select_related('content_type')
            .order_by('-created_at')
        )

        ids_by_type = {
            'playlist': [],
            'video': [],
            'channel': [],
        }

        for bookmark in bookmarks:
            content_type_name = bookmark.content_type.model
            if content_type_name in ids_by_type:
                ids_by_type[content_type_name].append(bookmark.object_id)

        context = {'request': request}
        sections = []
        consumed_ids = {
            'playlist': set(),
            'video': set(),
            'channel': set(),
        }
        order_map = {
            'playlist': {item_id: index for index, item_id in enumerate(ids_by_type['playlist'])},
            'video': {item_id: index for index, item_id in enumerate(ids_by_type['video'])},
            'channel': {item_id: index for index, item_id in enumerate(ids_by_type['channel'])},
        }

        for section in self._sections_queryset(request, ids_by_type):
            if section.content_type == 'playlist':
                items = [
                    item for item in section.playlists.all()
                    if item.id in order_map['playlist'] and item.id not in consumed_ids['playlist']
                ]
                items = self._ordered_section_items(items, order_map['playlist'])
                if not items:
                    continue
                consumed_ids['playlist'].update(item.id for item in items)
                sections.append({
                    'id': section.id,
                    'title': section.title,
                    'subtitle': section.subtitle,
                    'content_type': 'playlist',
                    'order': section.order,
                    'playlists': PlaylistSerializer(items, many=True, context=context).data,
                    'videos': [],
                    'channels': [],
                })
                continue

            if section.content_type == 'video':
                items = [
                    item for item in section.videos.all()
                    if item.id in order_map['video'] and item.id not in consumed_ids['video']
                ]
                items = self._ordered_section_items(items, order_map['video'])
                if not items:
                    continue
                consumed_ids['video'].update(item.id for item in items)
                sections.append({
                    'id': section.id,
                    'title': section.title,
                    'subtitle': section.subtitle,
                    'content_type': 'video',
                    'order': section.order,
                    'playlists': [],
                    'videos': VideoSerializer(items, many=True, context=context).data,
                    'channels': [],
                })
                continue

            items = [
                item for item in section.channels.all()
                if item.id in order_map['channel'] and item.id not in consumed_ids['channel']
            ]
            items = self._ordered_section_items(items, order_map['channel'])
            if not items:
                continue
            consumed_ids['channel'].update(item.id for item in items)
            sections.append({
                'id': section.id,
                'title': section.title,
                'subtitle': section.subtitle,
                'content_type': 'channel',
                'order': section.order,
                'playlists': [],
                'videos': [],
                'channels': ChannelSerializer(items, many=True, context=context).data,
            })

        playlists = self._ordered_items(
            Playlist,
            [item_id for item_id in ids_by_type['playlist'] if item_id not in consumed_ids['playlist']],
        )
        if playlists:
            sections.append({
                'id': 'favorites-playlists',
                'title': 'Saved playlists',
                'subtitle': 'Playlists you bookmarked for later',
                'content_type': 'playlist',
                'order': 10000,
                'playlists': PlaylistSerializer(playlists, many=True, context=context).data,
                'videos': [],
                'channels': [],
            })

        videos = self._ordered_items(
            Video,
            [item_id for item_id in ids_by_type['video'] if item_id not in consumed_ids['video']],
        )
        if videos:
            sections.append({
                'id': 'favorites-videos',
                'title': 'Saved videos',
                'subtitle': 'Videos you bookmarked for quick return',
                'content_type': 'video',
                'order': 10001,
                'playlists': [],
                'videos': VideoSerializer(videos, many=True, context=context).data,
                'channels': [],
            })

        channels = self._ordered_items(
            Channel,
            [item_id for item_id in ids_by_type['channel'] if item_id not in consumed_ids['channel']],
        )
        if channels:
            sections.append({
                'id': 'favorites-channels',
                'title': 'Saved channels',
                'subtitle': 'Channels you want to follow',
                'content_type': 'channel',
                'order': 10002,
                'playlists': [],
                'videos': [],
                'channels': ChannelSerializer(channels, many=True, context=context).data,
            })

        return Response(sections)
