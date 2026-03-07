from rest_framework import serializers
from courses.models import Playlist
from .tag import TagSerializer
from .channel import ChannelSerializer


class PlaylistSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    channel = ChannelSerializer(read_only=True)
    url = serializers.CharField(read_only=True)

    class Meta:
        model = Playlist
        fields = (
            'id', 'youtube_id', 'title', 'thumbnail_url', 'video_count',
            'channel', 'tags', 'url',
            'description', 'language', 'lang', 'duration',
            'why_this_course', 'what_you_will_learn',
        )
