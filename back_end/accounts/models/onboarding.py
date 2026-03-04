from django.conf import settings
from django.db import models


class UserOnboarding(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='onboarding',
        verbose_name='Пользователь',
    )
    field = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Направление',
    )
    occupation = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Профессия',
    )
    skills = models.JSONField(
        default=list,
        verbose_name='Навыки',
    )
    current_step = models.PositiveSmallIntegerField(
        default=0,
        verbose_name='Текущий шаг',
    )
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')

    class Meta:
        verbose_name = 'Онбординг пользователя'
        verbose_name_plural = 'Онбординг пользователей'

    def __str__(self):
        return f'Онбординг: {self.user.email} (шаг {self.current_step})'
