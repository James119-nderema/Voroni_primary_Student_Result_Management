from rest_framework import serializers
from .models import Subject

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']
        extra_kwargs = {
            'name': {
                'required': True,
                'allow_blank': False,
            }
        }

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Subject name cannot be empty.")
        return value