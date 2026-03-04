from django.db import models


class Channel(models.Model):
    youtube_id = models.CharField(max_length=100, unique=True, verbose_name='YouTube ID')
    name = models.CharField(max_length=255, verbose_name='Название канала')
    subscribers = models.CharField(max_length=20, blank=True, verbose_name='Подписчики')
    avatar_url = models.URLField(blank=True, verbose_name='Аватар (URL)')
    description = models.TextField(blank=True, verbose_name='Описание')
    url = models.URLField(blank=True, verbose_name='Ссылка на канал')
    tags = models.ManyToManyField('courses.Tag', blank=True, related_name='channels', verbose_name='Теги')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        verbose_name = 'Канал'
        verbose_name_plural = 'Каналы'

    def __str__(self):
        return self.name
