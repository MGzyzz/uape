from rest_framework import serializers
from accounts.models import User
from accounts.utils.password import validate_password_strength


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'password')

    def validate_password(self, value):
        validate_password_strength(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.is_active = False
        user.save(update_fields=['is_active'])
        return user
