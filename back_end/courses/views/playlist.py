from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from courses.models import Playlist
from courses.serializers import PlaylistSerializer


class PlaylistListView(ListAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = (AllowAny,)
    queryset = Playlist.objects.select_related('channel').prefetch_related('tags').all()


class PlaylistDetailView(RetrieveAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = (AllowAny,)
    queryset = Playlist.objects.select_related('channel').prefetch_related('tags').all()
