from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from courses.models import Video
from courses.serializers import VideoSerializer


class VideoListView(ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = (AllowAny,)
    queryset = Video.objects.select_related('channel').prefetch_related('tags').all()


class VideoDetailView(RetrieveAPIView):
    serializer_class = VideoSerializer
    permission_classes = (AllowAny,)
    queryset = Video.objects.select_related('channel').prefetch_related('tags').all()
