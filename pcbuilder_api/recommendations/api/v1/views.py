from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RecommendationRequestSerializer

class RecommendationView(APIView):
    """
    Receives PC build preferences, validates them, and returns a recommendation.
    """
    def post(self, request):
        # The frontend sends camelCase keys, but our serializer expects snake_case.
        # We can handle this conversion here before validating the data.
        request_data = {
            'budget': request.data.get('budget'),
            'use_case': request.data.get('useCase'),
            'gaming_type': request.data.get('gamingType'),
            'priority': request.data.get('priority'),
        }

        serializer = RecommendationRequestSerializer(data=request_data)
        if serializer.is_valid():
            # Here is where you would add your AI logic or other business logic
            # to generate the PC part recommendations based on the validated data.
            print("Validated data:", serializer.validated_data)

            # For now, we'll just return the data that was sent.
            response_data = {
                'status': 'success',
                'message': 'Recommendations received successfully!',
                'data': serializer.validated_data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        
        error_response = {
            'status': 'error',
            'message': 'Invalid input.',
            'errors': serializer.errors
        }
        return Response(error_response, status=status.HTTP_400_BAD_REQUEST)

