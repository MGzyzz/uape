from datetime import timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User, EmailVerification


RESEND_COOLDOWN_SECONDS = 60


class ResendVerificationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip().lower()
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal whether email exists
            return Response({'detail': 'If that email is registered, a new link has been sent.'})

        if user.is_active:
            return Response({'detail': 'If that email is registered, a new link has been sent.'})

        # Throttle: check if last token is too recent
        last_token = EmailVerification.objects.filter(user=user).order_by('-created_at').first()
        if last_token:
            cooldown_end = last_token.created_at + timedelta(seconds=RESEND_COOLDOWN_SECONDS)
            if timezone.now() < cooldown_end:
                seconds_left = int((cooldown_end - timezone.now()).total_seconds())
                return Response(
                    {'detail': f'Please wait {seconds_left} seconds before requesting a new link.'},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )

        ev = EmailVerification.objects.create(user=user)
        verify_url = f"{settings.FRONTEND_URL}/verify-email?token={ev.token}"
        html_message = render_to_string('accounts/verify_email.html', {
            'first_name': user.first_name,
            'verify_url': verify_url,
        })
        try:
            send_mail(
                subject='Confirm your email — UAPE',
                message=f'Hi {user.first_name},\n\nConfirm your email: {verify_url}\n\nLink valid for 24 hours.',
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

        return Response({'detail': 'If that email is registered, a new link has been sent.'})
