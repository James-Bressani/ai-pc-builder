from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class RecommendationAPITests(APITestCase):
    def setUp(self):
        self.url = reverse('get_recommendations')

    def test_valid_gaming_recommendation_request(self):
        """
        Ensure we can get a successful response for a valid gaming request.
        """
        data = {
            "budget": 2000,
            "useCase": "gaming",
            "gamingType": "esports",
            "priority": "optimized"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertEqual(response.data['data']['use_case'], 'gaming')

    def test_valid_productivity_recommendation_request(self):
        """
        Ensure we can get a successful response for a valid non-gaming request.
        """
        data = {
            "budget": 1500,
            "useCase": "productivity",
            "priority": "aesthetics"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'success')
        self.assertIsNone(response.data['data']['gaming_type'])

    def test_missing_budget_field(self):
        """
        Ensure a request fails if the budget field is missing.
        """
        data = {
            "useCase": "gaming",
            "gamingType": "story_aaa",
            "priority": "optimized"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('budget', response.data['errors'])

    def test_budget_out_of_range(self):
        """
        Ensure a request fails if the budget is below the minimum.
        """
        data = {
            "budget": 499,
            "useCase": "gaming",
            "gamingType": "esports",
            "priority": "optimized"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('budget', response.data['errors'])

    def test_invalid_choice_for_use_case(self):
        """
        Ensure a request fails for an invalid use_case choice.
        """
        data = {
            "budget": 1000,
            "useCase": "watching_videos",
            "priority": "optimized"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('use_case', response.data['errors'])

    def test_gaming_use_case_requires_gaming_type(self):
        """
        Ensure the custom validation works: gaming use case requires gaming_type.
        """
        data = {
            "budget": 1800,
            "useCase": "gaming",
            "priority": "aesthetics"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['status'], 'error')
        self.assertIn('non_field_errors', response.data['errors'])
