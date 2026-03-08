from datetime import timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import EmailVerification


TOKEN_EXPIRY_HOURS = 24


class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({'detail': 'Token is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            ev = EmailVerification.objects.select_related('user').get(token=token)
        except (EmailVerification.DoesNotExist, ValueError):
            return Response({'detail': 'Invalid token.'}, status=status.HTTP_400_BAD_REQUEST)

        if ev.is_used:
            return Response({'detail': 'This link has already been used.'}, status=status.HTTP_400_BAD_REQUEST)

        expiry = ev.created_at + timedelta(hours=TOKEN_EXPIRY_HOURS)
        if timezone.now() > expiry:
            return Response({'detail': 'Token expired.'}, status=status.HTTP_400_BAD_REQUEST)

        user = ev.user
        user.is_active = True
        user.save(update_fields=['is_active'])

        ev.is_used = True
        ev.save(update_fields=['is_used'])

        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'first_name': user.first_name,
            'last_name': user.last_name,
        })
