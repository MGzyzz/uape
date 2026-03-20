from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from accounts.models.password_reset import PasswordResetToken


RESEND_COOLDOWN_SECONDS = 60


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Always return same message — don't reveal if email exists
        success_response = Response({'detail': 'If that email is registered, a reset link has been sent.'})

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return success_response

        if not user.is_active:
            return success_response

        # Google OAuth users have no password — skip
        if not user.has_usable_password():
            return success_response

        # Throttle
        last_token = PasswordResetToken.objects.filter(user=user, is_used=False).order_by('-created_at').first()
        if last_token:
            cooldown_end = last_token.created_at + timedelta(seconds=RESEND_COOLDOWN_SECONDS)
            if timezone.now() < cooldown_end:
                seconds_left = int((cooldown_end - timezone.now()).total_seconds())
                return Response(
                    {'detail': f'Please wait {seconds_left} seconds before requesting a new link.'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )

        token = PasswordResetToken.objects.create(user=user)
        reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token.token}"
        html_message = render_to_string('accounts/reset_password.html', {
            'first_name': user.first_name,
            'reset_url': reset_url,
        })
        try:
            send_mail(
                subject='Reset your password — UAPE',
                message=f'Hi {user.first_name},\n\nReset your password: {reset_url}\n\nLink valid for 24 hours.',
                from_email=settings.EMAIL_FROM,
                recipient_list=[user.email],
                html_message=html_message,
                fail_silently=False,
            )
        except Exception:
            return Response(
                {'detail': 'Failed to send email. Please try again later.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return success_response
