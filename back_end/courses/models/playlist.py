from django.db import models


class Playlist(models.Model):
    youtube_id = models.CharField(max_length=100, unique=True, verbose_name='YouTube ID')
    title = models.CharField(max_length=255, verbose_name='Название')
    thumbnail_url = models.URLField(blank=True, verbose_name='Обложка (URL)')
    video_count = models.PositiveIntegerField(default=0, verbose_name='Количество видео')
    channel = models.ForeignKey(
        'courses.Channel',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='playlists',
        verbose_name='Канал',
    )
    tags = models.ManyToManyField('courses.Tag', blank=True, related_name='playlists', verbose_name='Теги')
    description = models.TextField(blank=True, verbose_name='Краткое описание')
    language = models.CharField(max_length=100, blank=True, verbose_name='Язык программирования (напр. Python)')
    lang = models.CharField(max_length=50, blank=True, verbose_name='Язык курса (напр. En/Англ)')
    duration = models.CharField(max_length=50, blank=True, verbose_name='Продолжительность (напр. 5h 35m)')
    why_this_course = models.TextField(blank=True, verbose_name='Почему этот курс? (каждая строка — пункт)')
    what_you_will_learn = models.TextField(blank=True, verbose_name='Что вы узнаете? (каждая строка — пункт)')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        verbose_name = 'Плейлист'
        verbose_name_plural = 'Плейлисты'

    def __str__(self):
        return self.title

    @property
    def url(self):
        return f'https://www.youtube.com/playlist?list={self.youtube_id}'
