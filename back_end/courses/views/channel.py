from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from courses.models import Channel
from courses.serializers import ChannelSerializer


class ChannelListView(ListAPIView):
    serializer_class = ChannelSerializer
    permission_classes = (AllowAny,)
    pagination_class = None

    def get_queryset(self):
        qs = Channel.objects.prefetch_related('tags').all()

        tag = self.request.query_params.get('tag', '').strip().lower()
        tags = self.request.query_params.get('tags', '').strip().lower()
        tag_names = []

        if tag:
            tag_names.append(tag)
        if tags:
            tag_names.extend(t.strip() for t in tags.split(',') if t.strip())

        if tag_names:
            return qs.filter(tags__name__in=tag_names).distinct()

        return qs


class ChannelDetailView(RetrieveAPIView):
    serializer_class = ChannelSerializer
    permission_classes = (AllowAny,)
    queryset = Channel.objects.prefetch_related('tags').all()
