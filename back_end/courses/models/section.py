from django.db import models


class Section(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('playlist', 'Плейлист'),
        ('video', 'Видео'),
        ('channel', 'Канал'),
    ]

    title = models.CharField(max_length=255, verbose_name='Заголовок')
    subtitle = models.CharField(max_length=255, blank=True, verbose_name='Подзаголовок')
    content_type = models.CharField(
        max_length=20,
        choices=CONTENT_TYPE_CHOICES,
        verbose_name='Тип контента',
    )
    order = models.PositiveIntegerField(default=0, verbose_name='Порядок')
    # Если указано — раздел показывается только пользователям с этим направлением
    field = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Направление (фильтр)',
        help_text='Оставьте пустым чтобы показывать всем пользователям',
    )

    playlists = models.ManyToManyField(
        'courses.Playlist', blank=True, related_name='sections', verbose_name='Плейлисты'
    )
    videos = models.ManyToManyField(
        'courses.Video', blank=True, related_name='sections', verbose_name='Видео'
    )
    channels = models.ManyToManyField(
        'courses.Channel', blank=True, related_name='sections', verbose_name='Каналы'
    )

    class Meta:
        ordering = ['order']
        verbose_name = 'Раздел'
        verbose_name_plural = 'Разделы'

    def __str__(self):
        return self.title
