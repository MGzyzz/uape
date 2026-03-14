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

        existing = AssessmentResult.objects.filter(user=request.user, language=language).first()
        if existing:
            serialized = AssessmentResultSerializer(existing).data
            return Response({**serialized, 'detail': 'already_exists'}, status=status.HTTP_400_BAD_REQUEST)

        result = AssessmentResult.objects.create(
            user=request.user,
            language=language,
            score=score,
            level=level,
        )
        return Response(AssessmentResultSerializer(result).data, status=status.HTTP_201_CREATED)


class AssessmentResultsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        results = AssessmentResult.objects.filter(user=request.user).order_by('-created_at')
        return Response(AssessmentResultSerializer(results, many=True).data)
