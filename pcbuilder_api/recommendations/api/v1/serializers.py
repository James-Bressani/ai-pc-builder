from rest_framework import serializers

class RecommendationRequestSerializer(serializers.Serializer):
    USE_CASE_CHOICES = [
        ('gaming', 'Gaming'),
        ('productivity', 'Productivity'),
        ('content_creation', 'Content Creation'),
    ]
    GAMING_TYPE_CHOICES = [
        ('esports', 'Esports'),
        ('story_aaa', 'Story / AAA'),
    ]
    PRIORITY_CHOICES = [
        ('optimized', 'Optimized'),
        ('aesthetics', 'Aesthetics'),
    ]

    budget = serializers.IntegerField(min_value=500, max_value=5000)
    use_case = serializers.ChoiceField(choices=USE_CASE_CHOICES)
    gaming_type = serializers.ChoiceField(choices=GAMING_TYPE_CHOICES, required=False, allow_null=True)
    priority = serializers.ChoiceField(choices=PRIORITY_CHOICES)

    def validate(self, data):
        """
        Check that gaming_type is provided if use_case is 'gaming'.
        """
        if data.get('use_case') == 'gaming' and not data.get('gaming_type'):
            raise serializers.ValidationError("gaming_type is required for the 'gaming' use case.")
        if data.get('use_case') != 'gaming' and data.get('gaming_type'):
            raise serializers.ValidationError("gaming_type should only be provided for the 'gaming' use case.")
        return data
