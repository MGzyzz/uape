import requests as http_requests
from django.conf import settings
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import User


class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        access_token = request.data.get('access_token')
        if not access_token:
            return Response(
                {'detail': 'access_token is required'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Fetch user info from Google
        try:
            resp = http_requests.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                headers={'Authorization': f'Bearer {access_token}'},
                timeout=10,
            )
            resp.raise_for_status()
            payload = resp.json()
        except Exception:
            return Response(
                {'detail': 'Invalid Google token'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Require verified email
        if not payload.get('email_verified'):
            return Response(
                {'detail': 'Google account email is not verified'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = payload.get('email')
        if not email:
            return Response(
                {'detail': 'Google account has no email'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate token was issued for this application
        google_client_id = getattr(settings, 'GOOGLE_CLIENT_ID', '')
        if google_client_id:
            try:
                tokeninfo_resp = http_requests.get(
                    'https://www.googleapis.com/oauth2/v3/tokeninfo',
                    params={'access_token': access_token},
                    timeout=10,
                )
                tokeninfo_resp.raise_for_status()
                tokeninfo = tokeninfo_resp.json()
                token_aud = tokeninfo.get('aud', '')
                token_azp = tokeninfo.get('azp', '')
                if token_aud != google_client_id and token_azp != google_client_id:
                    return Response(
                        {'detail': 'Token was not issued for this application'},
                        status=status.HTTP_401_UNAUTHORIZED,
                    )
            except Exception:
                return Response(
                    {'detail': 'Could not validate Google token'},
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
