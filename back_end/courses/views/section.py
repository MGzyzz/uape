from django.db import models
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

from courses.models import Section
from courses.serializers import SectionSerializer


class SectionListView(ListAPIView):
    serializer_class = SectionSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        qs = Section.objects.prefetch_related(
            'playlists__channel', 'playlists__tags',
            'videos__channel', 'videos__tags',
            'channels__tags',
        )

        tag = self.request.query_params.get('tag', '').strip().lower()
        if tag:
            return qs.filter(
                models.Q(playlists__tags__name__iexact=tag) |
                models.Q(videos__tags__name__iexact=tag) |
                models.Q(channels__tags__name__iexact=tag)
            ).distinct()

        user = self.request.user
        if user.is_authenticated:
            try:
                user_field = user.onboarding.field
            except Exception:
                user_field = ''
        else:
            user_field = ''

        # Show sections without a field filter (general) + sections matching user's field
        if user_field:
            return qs.filter(
                models.Q(field='') | models.Q(field=user_field)
            )
        return qs.filter(field='')
