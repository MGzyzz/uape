from django.conf import settings
from google.oauth2 import id_token
from google.auth.transport.requests import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if not settings.GOOGLE_CLIENT_ID:
            return Response(
                {'detail': 'Google auth not configured'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        credential = request.data.get('credential')
        if not credential:
            return Response(
                {'detail': 'credential is required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            payload = id_token.verify_oauth2_token(
                credential,
                Request(),
                settings.GOOGLE_CLIENT_ID,
            )
        except ValueError as e:
            return Response(
                {'detail': f'Invalid Google token: {e}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = payload.get('email')
        if not email:
            return Response(
                {'detail': 'Google account has no email'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                'first_name': payload.get('given_name', ''),
                'last_name': payload.get('family_name', ''),
            },
        )

        if created:
            user.set_unusable_password()
            user.save(update_fields=['password'])

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_new': created,
        })
