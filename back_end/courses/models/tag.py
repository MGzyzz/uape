from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Название')
    color = models.CharField(max_length=7, default='#ffffff', verbose_name='Цвет (HEX)')

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    def __str__(self):
        return self.name
