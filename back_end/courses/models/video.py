from django.db import models


class Video(models.Model):
    youtube_id = models.CharField(max_length=100, unique=True, verbose_name='YouTube ID')
    title = models.CharField(max_length=255, verbose_name='Название')
    thumbnail_url = models.URLField(blank=True, verbose_name='Обложка (URL)')
    duration = models.CharField(max_length=20, blank=True, verbose_name='Длительность')
    channel = models.ForeignKey(
        'courses.Channel',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='videos',
        verbose_name='Канал',
    )
    tags = models.ManyToManyField('courses.Tag', blank=True, related_name='videos', verbose_name='Теги')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'

    def __str__(self):
        return self.title

    @property
    def url(self):
        return f'https://www.youtube.com/watch?v={self.youtube_id}'
