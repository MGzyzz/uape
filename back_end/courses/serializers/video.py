from rest_framework import serializers
from courses.models import Video
from .tag import TagSerializer
from .channel import ChannelSerializer
from .favorited import FavoritedSerializerMixin


class VideoSerializer(FavoritedSerializerMixin, serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    channel = ChannelSerializer(read_only=True)
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Video
        fields = ('id', 'youtube_id', 'title', 'thumbnail_url', 'duration', 'channel', 'tags', 'url', 'favorited')
