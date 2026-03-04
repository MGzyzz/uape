from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Playlist, Tag
from courses.serializers import PlaylistSerializer


class RecommendedPlaylistsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            skills = request.user.onboarding.skills or []
        except Exception:
            skills = []

        if not skills:
            return Response({'id': 'recommended', 'title': 'Recommended playlists for you',
                             'subtitle': 'Based on your skills and interests',
                             'content_type': 'playlist', 'order': 0,
                             'playlists': [], 'videos': [], 'channels': []})

        skills_lower = [s.lower() for s in skills]

        matching_tag_ids = []
        for tag in Tag.objects.all():
            tag_name = tag.name.lower()
            for skill in skills_lower:
                if tag_name in skill or any(w in tag_name for w in skill.split() if len(w) > 3):
                    matching_tag_ids.append(tag.id)
                    break

        playlists = (
            Playlist.objects
            .filter(tags__id__in=matching_tag_ids)
            .distinct()
            .select_related('channel')
            .prefetch_related('tags')[:10]
        )

        return Response({
            'id': 'recommended',
            'title': 'Recommended playlists for you',
            'subtitle': 'Based on your skills and interests',
            'content_type': 'playlist',
            'order': 0,
            'playlists': PlaylistSerializer(playlists, many=True).data,
            'videos': [],
            'channels': [],
        })
