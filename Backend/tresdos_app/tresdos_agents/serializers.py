from rest_framework import serializers
from .models import ReportDate

class ReportDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportDate
        fields = '__all__'  # Include all fields in the model (start_date, end_date)
