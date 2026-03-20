from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from accounts.models import AssessmentResult
from accounts.models.assessment_result import compute_level
from accounts.serializers.assessment import AssessmentSubmitSerializer, AssessmentResultSerializer


class AssessmentSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AssessmentSubmitSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        language = serializer.validated_data['language']
        score = serializer.validated_data['score']
        level = compute_level(score)

        result, created = AssessmentResult.objects.update_or_create(
            user=request.user,
            language=language,
            defaults={'score': score, 'level': level},
        )
        status_code = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(AssessmentResultSerializer(result).data, status=status_code)


class AssessmentResultsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        results = AssessmentResult.objects.filter(user=request.user).order_by('-created_at')
        return Response(AssessmentResultSerializer(results, many=True).data)
