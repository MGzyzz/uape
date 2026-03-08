from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny

from courses.models import Playlist
from courses.serializers import PlaylistSerializer


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class PlaylistListView(ListAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = (AllowAny,)
    pagination_class = StandardPagination
    queryset = Playlist.objects.select_related('channel').prefetch_related('tags').all()


class PlaylistDetailView(RetrieveAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = (AllowAny,)
    queryset = Playlist.objects.select_related('channel').prefetch_related('tags').all()
