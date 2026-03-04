from rest_framework import serializers
from courses.models import Section
from .playlist import PlaylistSerializer
from .video import VideoSerializer
from .channel import ChannelSerializer


class SectionSerializer(serializers.ModelSerializer):
    playlists = PlaylistSerializer(many=True, read_only=True)
    videos = VideoSerializer(many=True, read_only=True)
    channels = ChannelSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ('id', 'title', 'subtitle', 'content_type', 'order', 'playlists', 'videos', 'channels')
