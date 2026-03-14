from rest_framework import serializers
from accounts.models import AssessmentResult


class AssessmentSubmitSerializer(serializers.Serializer):
    language = serializers.ChoiceField(choices=[c[0] for c in AssessmentResult.LANGUAGE_CHOICES])
    score = serializers.IntegerField(min_value=0, max_value=15)


class AssessmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentResult
        fields = ['language', 'level', 'score', 'created_at']
