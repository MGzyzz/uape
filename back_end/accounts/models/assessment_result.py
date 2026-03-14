from django.conf import settings
from django.db import models


def compute_level(score: int) -> str:
    if score <= 5:
        return 'beginner'
    elif score <= 10:
        return 'intermediate'
    return 'advanced'


class AssessmentResult(models.Model):
    LANGUAGE_CHOICES = [
        ('python', 'Python'),
        ('javascript', 'JavaScript'),
        ('java', 'Java'),
        ('csharp', 'C#'),
        ('cpp', 'C++'),
    ]
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='assessment_results',
        verbose_name='Пользователь',
    )
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, verbose_name='Язык')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, verbose_name='Уровень')
    score = models.IntegerField(verbose_name='Счёт')  # 0–15
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создано')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлено')

    class Meta:
        unique_together = ('user', 'language')
        # NOTE: future retake feature requires removing this constraint
        # and switching create() to update_or_create()
        verbose_name = 'Результат диагностики'
        verbose_name_plural = 'Результаты диагностики'

    def __str__(self):
        return f'{self.user} — {self.language} — {self.level}'
