from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Playlist, Tag
from courses.serializers import PlaylistSerializer

FIELD_TO_TAGS = {
    'Server-Side Development': ['python', 'java', 'javascript', 'c#', 'c++'],
    'Building Websites':       ['javascript', 'python'],
    'Data Analysis':           ['python'],
    'Artificial Intelligence': ['python'],
    'Creating Mobile Apps':    ['java', 'javascript', 'c#'],
    'Task Automation':         ['python'],
    'Game Creation':           ['c#', 'c++'],
    'Cloud & Infrastructure':  ['python'],
    'Cybersecurity':           ['python'],
    'UI Development':          ['javascript'],
    'General Programming':     ['python', 'java', 'javascript', 'c#', 'c++'],
}

EMPTY_RESPONSE = {
    'id': 'recommended',
    'title': 'Recommended playlists for you',
    'subtitle': 'Based on your skills and interests',
    'content_type': 'playlist',
    'order': 0,
    'playlists': [],
    'videos': [],
    'channels': [],
}


class RecommendedPlaylistsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            field = request.user.onboarding.field or ''
        except Exception:
            field = ''

        if not field:
            return Response(EMPTY_RESPONSE)

        tag_names = FIELD_TO_TAGS.get(field, [])
        if not tag_names:
            return Response(EMPTY_RESPONSE)

        tag_ids = Tag.objects.filter(name__in=tag_names).values_list('id', flat=True)

        playlists = (
            Playlist.objects
            .filter(tags__id__in=tag_ids)
            .distinct()
            .select_related('channel')
            .prefetch_related('tags')[:10]
        )

        return Response({
            **EMPTY_RESPONSE,
            'playlists': PlaylistSerializer(playlists, many=True, context={'request': request}).data,
        })
