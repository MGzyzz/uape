import uuid
from datetime import timedelta

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from accounts.models import User, EmailVerification


class EmailVerificationModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            password='password123',
            first_name='Test',
            last_name='User',
        )

    def test_token_is_uuid(self):
        ev = EmailVerification.objects.create(user=self.user)
        self.assertIsInstance(ev.token, uuid.UUID)

    def test_default_is_not_used(self):
        ev = EmailVerification.objects.create(user=self.user)
        self.assertFalse(ev.is_used)


class RegisterViewTest(TestCase):
    def test_register_creates_inactive_user(self):
        response = self.client.post(reverse('register'), {
            'first_name': 'John',
            'last_name': 'Doe',
            'email': 'john@example.com',
            'password': 'securepass123',
        }, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertNotIn('access', response.json())
        user = User.objects.get(email='john@example.com')
        self.assertFalse(user.is_active)
        self.assertTrue(EmailVerification.objects.filter(user=user).exists())

    def test_register_returns_detail_message(self):
        response = self.client.post(reverse('register'), {
            'first_name': 'Jane',
            'last_name': 'Doe',
            'email': 'jane@example.com',
            'password': 'securepass123',
        }, content_type='application/json')
        self.assertIn('detail', response.json())


class VerifyEmailViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='verify@example.com',
            password='pass1234',
            first_name='Verify',
            last_name='Me',
            is_active=False,
        )
        self.ev = EmailVerification.objects.create(user=self.user)

    def test_valid_token_activates_user_and_returns_jwt(self):
        response = self.client.post(reverse('verify_email'), {'token': str(self.ev.token)},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('access', data)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)
        self.ev.refresh_from_db()
        self.assertTrue(self.ev.is_used)

    def test_invalid_token_returns_400(self):
        import uuid
        response = self.client.post(reverse('verify_email'), {'token': str(uuid.uuid4())},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_used_token_returns_400(self):
        self.ev.is_used = True
        self.ev.save()
        response = self.client.post(reverse('verify_email'), {'token': str(self.ev.token)},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_expired_token_returns_400(self):
        self.ev.created_at = timezone.now() - timedelta(hours=25)
        self.ev.save()
        response = self.client.post(reverse('verify_email'), {'token': str(self.ev.token)},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 400)


class ResendVerificationViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='resend@example.com',
            password='pass1234',
            first_name='Re',
            last_name='Send',
            is_active=False,
        )

    def test_resend_creates_new_token(self):
        response = self.client.post(reverse('resend_verification'), {'email': 'resend@example.com'},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(EmailVerification.objects.filter(user=self.user).count(), 1)

    def test_throttle_on_second_request(self):
        self.client.post(reverse('resend_verification'), {'email': 'resend@example.com'},
                         content_type='application/json')
        response = self.client.post(reverse('resend_verification'), {'email': 'resend@example.com'},
                                    content_type='application/json')
        self.assertEqual(response.status_code, 429)
