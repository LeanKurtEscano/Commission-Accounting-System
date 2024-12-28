from rest_framework import serializers
from .models import ReportDate,AgentIncomeReport

class ReportDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportDate
        fields = '__all__'  
        

class AgentReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentIncomeReport
        fields = '__all__'
