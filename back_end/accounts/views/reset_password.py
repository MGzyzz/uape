from datetime import timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models.password_reset import PasswordResetToken
from accounts.utils.password import validate_password_strength


TOKEN_TTL_HOURS = 24


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        token_value = request.data.get('token', '').strip()
        new_password = request.data.get('new_password', '')

        if not token_value or not new_password:
            return Response(
                {'detail': 'token and new_password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            token = PasswordResetToken.objects.select_related('user').get(token=token_value)
        except (PasswordResetToken.DoesNotExist, ValueError):
            return Response({'detail': 'Invalid or expired reset link.'}, status=status.HTTP_400_BAD_REQUEST)

        if token.is_used:
            return Response({'detail': 'This reset link has already been used.'}, status=status.HTTP_400_BAD_REQUEST)

        expires_at = token.created_at + timedelta(hours=TOKEN_TTL_HOURS)
        if timezone.now() > expires_at:
            return Response({'detail': 'This reset link has expired. Please request a new one.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password_strength(new_password)
        except ValidationError as e:
            return Response({'new_password': e.detail[0]}, status=status.HTTP_400_BAD_REQUEST)

        user = token.user
        user.set_password(new_password)
        user.save()

        token.is_used = True
        token.save(update_fields=['is_used'])

        return Response({'detail': 'Password reset successfully.'})
