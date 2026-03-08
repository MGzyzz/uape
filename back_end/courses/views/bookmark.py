from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from courses.models import Bookmark, Channel, Playlist, Video
from courses.serializers import BookmarkSerializer

ALLOWED_MODELS = {
    'playlist': Playlist,
    'video': Video,
    'channel': Channel,
}


class BookmarkView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        bookmarks = Bookmark.objects.filter(user=request.user).select_related('content_type')
        return Response(BookmarkSerializer(bookmarks, many=True).data)

    def post(self, request):
        content_type_name = request.data.get('content_type')
        try:
            object_id = int(request.data.get('object_id'))
            if object_id < 1:
                raise ValueError
        except (TypeError, ValueError):
            return Response({'detail': 'object_id must be a positive integer.'}, status=status.HTTP_400_BAD_REQUEST)

        model = ALLOWED_MODELS.get(content_type_name)
        if not model:
            return Response({'detail': 'Invalid content_type.'}, status=status.HTTP_400_BAD_REQUEST)

        if not model.objects.filter(pk=object_id).exists():
            return Response({'detail': 'Object not found.'}, status=status.HTTP_404_NOT_FOUND)

        ct = ContentType.objects.get_for_model(model)
        bookmark, created = Bookmark.objects.get_or_create(
            user=request.user, content_type=ct, object_id=object_id
        )
        code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(BookmarkSerializer(bookmark).data, status=code)

    def delete(self, request):
        content_type_name = request.data.get('content_type')
        try:
            object_id = int(request.data.get('object_id'))
            if object_id < 1:
                raise ValueError
        except (TypeError, ValueError):
            return Response({'detail': 'object_id must be a positive integer.'}, status=status.HTTP_400_BAD_REQUEST)

        model = ALLOWED_MODELS.get(content_type_name)
        if not model:
            return Response({'detail': 'Invalid content_type.'}, status=status.HTTP_400_BAD_REQUEST)

        ct = ContentType.objects.get_for_model(model)
        deleted, _ = Bookmark.objects.filter(
            user=request.user, content_type=ct, object_id=object_id
        ).delete()

        if not deleted:
            return Response({'detail': 'Bookmark not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
