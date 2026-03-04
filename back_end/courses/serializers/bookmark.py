from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers
from courses.models import Bookmark


class BookmarkSerializer(serializers.ModelSerializer):
    content_type_name = serializers.SerializerMethodField()

    class Meta:
        model = Bookmark
        fields = ('id', 'content_type', 'object_id', 'content_type_name', 'created_at')
        read_only_fields = ('created_at',)

    def get_content_type_name(self, obj):
        return obj.content_type.model
