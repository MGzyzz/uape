import re
from rest_framework.exceptions import ValidationError


def validate_password_strength(password):
    """
    Enforces password policy shared across registration and password change:
      - at least 8 characters
      - at least one uppercase letter
      - at least one digit
      - at least one special character
    """
    if len(password) < 8:
        raise ValidationError('Password must be at least 8 characters.')
    if not re.search(r'[A-Z]', password):
        raise ValidationError('Password must contain at least one uppercase letter.')
    if not re.search(r'\d', password):
        raise ValidationError('Password must contain at least one number.')
    if not re.search(r'[^A-Za-z0-9]', password):
        raise ValidationError('Password must contain at least one special character.')
