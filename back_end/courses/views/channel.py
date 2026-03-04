from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from courses.models import Channel
from courses.serializers import ChannelSerializer


class ChannelDetailView(RetrieveAPIView):
    serializer_class = ChannelSerializer
    permission_classes = (AllowAny,)
    queryset = Channel.objects.prefetch_related('tags').all()
