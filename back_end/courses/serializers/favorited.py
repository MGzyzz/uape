from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from courses.models import Bookmark


class FavoritedSerializerMixin(serializers.Serializer):
    favorited = serializers.SerializerMethodField()

    def get_favorited(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False

        cache = self.context.setdefault('_favorited_cache', {})
        model = obj.__class__
        model_key = model._meta.label_lower

        if model_key not in cache:
            content_type = ContentType.objects.get_for_model(model)
            cache[model_key] = set(
                Bookmark.objects.filter(
                    user=request.user,
                    content_type=content_type,
                ).values_list('object_id', flat=True)
            )

        return obj.pk in cache[model_key]
