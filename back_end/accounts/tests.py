import uuid
from datetime import timedelta

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone

from accounts.models import User, EmailVerification, AssessmentResult
from accounts.models.assessment_result import compute_level


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


class ComputeLevelTest(TestCase):
    def test_score_0_is_beginner(self):
        self.assertEqual(compute_level(0), 'beginner')

    def test_score_5_is_beginner(self):
        self.assertEqual(compute_level(5), 'beginner')

    def test_score_6_is_intermediate(self):
        self.assertEqual(compute_level(6), 'intermediate')

    def test_score_10_is_intermediate(self):
        self.assertEqual(compute_level(10), 'intermediate')

    def test_score_11_is_advanced(self):
        self.assertEqual(compute_level(11), 'advanced')

    def test_score_15_is_advanced(self):
        self.assertEqual(compute_level(15), 'advanced')

class AssessmentResultModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='assess@example.com',
            password='password123',
            first_name='Test',
            last_name='User',
            is_active=True,
        )

    def test_create_result(self):
        result = AssessmentResult.objects.create(
            user=self.user,
            language='python',
            score=9,
            level='intermediate',
        )
        self.assertEqual(str(result), f'{self.user} — python — intermediate')

    def test_unique_together_user_language(self):
        AssessmentResult.objects.create(user=self.user, language='python', score=9, level='intermediate')
        with self.assertRaises(Exception):
            AssessmentResult.objects.create(user=self.user, language='python', score=5, level='beginner')


class AssessmentAPITest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='apitest@example.com',
            password='password123',
            first_name='Api',
            last_name='User',
            is_active=True,
        )
        login_res = self.client.post(
            reverse('login'),
            {'email': 'apitest@example.com', 'password': 'password123'},
            content_type='application/json',
        )
        self.access = login_res.data['access']

    def _auth(self):
        return {'HTTP_AUTHORIZATION': f'Bearer {self.access}'}

    def test_submit_creates_result_with_level(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 9},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data['level'], 'intermediate')
        self.assertEqual(res.data['score'], 9)
        self.assertEqual(res.data['language'], 'python')

    def test_submit_score_0_gives_beginner(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 0},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.data['level'], 'beginner')

    def test_submit_score_15_gives_advanced(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 15},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.data['level'], 'advanced')

    def test_submit_duplicate_returns_400_with_detail(self):
        self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 9},
            content_type='application/json',
            **self._auth(),
        )
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 5},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.status_code, 400)
        self.assertEqual(res.data['detail'], 'already_exists')
        self.assertIn('level', res.data)
        self.assertIn('score', res.data)
        self.assertIn('language', res.data)

    def test_submit_score_above_max_returns_400(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 16},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.status_code, 400)

    def test_submit_score_below_min_returns_400(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': -1},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.status_code, 400)

    def test_submit_invalid_language_returns_400(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'ruby', 'score': 9},
            content_type='application/json',
            **self._auth(),
        )
        self.assertEqual(res.status_code, 400)

    def test_submit_unauthenticated_returns_401(self):
        res = self.client.post(
            reverse('assessment_submit'),
            {'language': 'python', 'score': 9},
            content_type='application/json',
        )
        self.assertEqual(res.status_code, 401)

    def test_get_results_returns_list(self):
        AssessmentResult.objects.create(
            user=self.user, language='python', score=9, level='intermediate'
        )
        res = self.client.get(reverse('assessment_results'), **self._auth())
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['language'], 'python')
        self.assertIn('level', res.data[0])
        self.assertIn('score', res.data[0])

    def test_get_results_empty_list(self):
        res = self.client.get(reverse('assessment_results'), **self._auth())
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, [])

    def test_get_results_unauthenticated_returns_401(self):
        res = self.client.get(reverse('assessment_results'))
        self.assertEqual(res.status_code, 401)
