from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserOnboarding


class OnboardingView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        onboarding, _ = UserOnboarding.objects.get_or_create(user=request.user)
        return Response({
            'field': onboarding.field,
            'occupation': onboarding.occupation,
            'skills': onboarding.skills,
            'current_step': onboarding.current_step,
        })

    def patch(self, request):
        onboarding, _ = UserOnboarding.objects.get_or_create(user=request.user)

        if 'field' in request.data:
            onboarding.field = request.data['field']
            if onboarding.current_step < 1:
                onboarding.current_step = 1

        if 'occupation' in request.data:
            onboarding.occupation = request.data['occupation']
            if onboarding.current_step < 2:
                onboarding.current_step = 2

        if 'skills' in request.data:
            onboarding.skills = request.data['skills']
            if onboarding.current_step < 3:
                onboarding.current_step = 3

        onboarding.save()
        return Response({
            'field': onboarding.field,
            'occupation': onboarding.occupation,
            'skills': onboarding.skills,
            'current_step': onboarding.current_step,
        })
