from rest_framework import serializers
from courses.models import Channel
from .tag import TagSerializer
from .favorited import FavoritedSerializerMixin


class ChannelSerializer(FavoritedSerializerMixin, serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Channel
        fields = ('id', 'youtube_id', 'name', 'subscribers', 'avatar_url', 'description', 'url', 'tags', 'favorited')
