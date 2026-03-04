from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models


class Bookmark(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='bookmarks',
        verbose_name='Пользователь',
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        verbose_name='Тип объекта',
    )
    object_id = models.PositiveIntegerField(verbose_name='ID объекта')
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
        verbose_name = 'Закладка'
        verbose_name_plural = 'Закладки'

    def __str__(self):
        return f'{self.user} → {self.content_object}'
