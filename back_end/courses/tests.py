from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from rest_framework.test import APITestCase

from accounts.models import User, UserOnboarding
from courses.models import Bookmark, Channel, Playlist, Section, Tag, Video


class FavoritesApiTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='favorites@example.com',
            password='password123',
            first_name='Fav',
            last_name='User',
            is_active=True,
        )
        self.client.force_authenticate(self.user)

        self.tag = Tag.objects.create(name='python', color='#30A14E')
        self.channel = Channel.objects.create(
            youtube_id='channel-1',
            name='Data with Baraa',
            subscribers='313000',
            avatar_url='https://example.com/avatar.png',
            description='Python channel',
            url='https://youtube.com/@datawithbaraa',
        )
        self.channel.tags.add(self.tag)

        self.playlist = Playlist.objects.create(
            youtube_id='playlist-1',
            title='Python Ultimate Course',
            thumbnail_url='https://example.com/playlist.png',
            video_count=47,
            channel=self.channel,
            description='Playlist description',
            language='Python',
            lang='EN',
            duration='13h',
        )
        self.playlist.tags.add(self.tag)

        self.video = Video.objects.create(
            youtube_id='video-1',
            title='Python Warmup',
            thumbnail_url='https://example.com/video.png',
            duration='12:34',
            channel=self.channel,
        )
        self.video.tags.add(self.tag)
        self.playlist_section = Section.objects.create(
            title='Python',
            subtitle='Recommended courses for your current level',
            content_type='playlist',
            order=0,
            field='',
        )
        self.playlist_section.playlists.add(self.playlist)
        UserOnboarding.objects.create(
            user=self.user,
            field='',
            occupation='Developer',
            skills=['python'],
            current_step=3,
        )

    def test_favorites_endpoint_returns_grouped_saved_content(self):
        Bookmark.objects.create(
            user=self.user,
            content_type=ContentType.objects.get_for_model(Playlist),
            object_id=self.playlist.id,
        )
        Bookmark.objects.create(
            user=self.user,
            content_type=ContentType.objects.get_for_model(Video),
            object_id=self.video.id,
        )

        response = self.client.get(reverse('favorites'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['title'], 'Python')
        self.assertEqual(data[0]['subtitle'], 'Recommended courses for your current level')
        self.assertEqual(data[0]['content_type'], 'playlist')
        self.assertEqual(data[0]['playlists'][0]['id'], self.playlist.id)
        self.assertTrue(data[0]['playlists'][0]['favorited'])
        self.assertEqual(data[1]['content_type'], 'video')
        self.assertEqual(data[1]['videos'][0]['id'], self.video.id)
        self.assertTrue(data[1]['videos'][0]['favorited'])

    def test_sections_endpoint_marks_bookmarked_items_as_favorited(self):
        Bookmark.objects.create(
            user=self.user,
            content_type=ContentType.objects.get_for_model(Playlist),
            object_id=self.playlist.id,
        )

        response = self.client.get(reverse('section-list'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], 'Python')
        self.assertEqual(data[0]['playlists'][0]['id'], self.playlist.id)
        self.assertTrue(data[0]['playlists'][0]['favorited'])

    def test_recommended_endpoint_marks_bookmarked_items_as_favorited(self):
        Bookmark.objects.create(
            user=self.user,
            content_type=ContentType.objects.get_for_model(Playlist),
            object_id=self.playlist.id,
        )

        response = self.client.get(reverse('recommended'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['content_type'], 'playlist')
        self.assertEqual(len(data['playlists']), 1)
        self.assertEqual(data['playlists'][0]['id'], self.playlist.id)
        self.assertTrue(data['playlists'][0]['favorited'])
