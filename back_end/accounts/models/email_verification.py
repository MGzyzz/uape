import uuid
from django.db import models
from accounts.models.user import User


class EmailVerification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='email_verifications')
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Email верификация'
        verbose_name_plural = 'Email верификации'

    def __str__(self):
        return f'{self.user.email} — {"used" if self.is_used else "pending"}'
