from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError

from accounts.utils.password import validate_password_strength


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        current_password = request.data.get('current_password', '')
        new_password = request.data.get('new_password', '')

        if not current_password or not new_password:
            return Response(
                {'detail': 'current_password and new_password are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user

        if not user.has_usable_password():
            return Response(
                {'detail': 'Cannot change password for social login accounts.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.check_password(current_password):
            return Response(
                {'current_password': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            validate_password_strength(new_password)
        except ValidationError as e:
            return Response(
                {'new_password': e.detail[0]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response({'detail': 'Password changed successfully.'})
