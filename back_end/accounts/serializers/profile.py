from rest_framework import serializers

from accounts.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Profile
        fields = ('email', 'first_name', 'last_name', 'avatar', 'bio', 'phone')

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        return super().update(instance, validated_data)
