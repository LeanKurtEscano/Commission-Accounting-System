from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from tresdos_agents.models import AgentIncomeReport,BaseAgent,HeadAgent,MidAgent
from django.db.models import Sum,Count
from datetime import datetime,timedelta
from django.utils import timezone
import calendar

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_total_sales(request):
    total_income = AgentIncomeReport.objects.aggregate(total_income=Sum('total_amount'))['total_income'] or 0  # Handle None case
    return Response({"total": total_income}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_current_month_sum(request):
    
    current_date = datetime.now()

   
    first_day_of_month = current_date.replace(day=1)

    # Get the last day of the current month
    if current_date.month == 12:
        last_day_of_month = datetime(current_date.year + 1, 1, 1) - timedelta(days=1)
    else:
        last_day_of_month = datetime(current_date.year, current_date.month + 1, 1) - timedelta(days=1)

   
    month_sum = (
        AgentIncomeReport.objects
        .filter(report_date__start_date__gte=first_day_of_month, report_date__end_date__lte=last_day_of_month)
        .aggregate(
            total_amount_sum=Sum('total_amount'),
        )
    )
    

    return Response(month_sum, status=200)





@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_total_share(request):
    total_share = AgentIncomeReport.objects.aggregate(total_share=Sum('income'))['total_share'] or 0  
    return Response({"total": total_share}, status=status.HTTP_200_OK)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_count_agents(request):
    try:
        head_agent = HeadAgent.objects.aggregate(head_total=Count('name'))['head_total'] or 0
        mid_agent = MidAgent.objects.aggregate(mid_total=Count('name'))['mid_total'] or 0
        base_agent = BaseAgent.objects.aggregate(base_total=Count('name'))['base_total'] or 0

        return Response(
            {"head": head_agent, "mid": mid_agent, "base": base_agent},
            status=status.HTTP_200_OK,
        )
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_latest_reports(request):
    try:
        latest_report = (
            AgentIncomeReport.objects.values('report_date__start_date', 'report_date__end_date')
            .annotate(
                total_sum=Sum('total_amount'),
                revenue=Sum('income')
            )
            .order_by('-report_date__start_date')[:10]
        )
        
       
        if not latest_report:
            return Response({"message": "No reports available."}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(latest_report, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )






@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_monthly_sum(request):
    try:
       
        month_name = request.data.get("selectedMonth", "").capitalize()

      
        if month_name not in calendar.month_name[1:]:
            return Response({"error": "Invalid month name"}, status=status.HTTP_400_BAD_REQUEST)

    
        current_year = timezone.now().year

        # Convert month name to month number
        month_number = list(calendar.month_name).index(month_name)

        # Get the first and last day of the month
        start_date = datetime(current_year, month_number, 1)  # First day of the month
        end_date = datetime(current_year, month_number, calendar.monthrange(current_year, month_number)[1])  # Last day of the month

       
        weekly_data = []

      
        reports = AgentIncomeReport.objects.filter(
            report_date__start_date__gte=start_date,
            report_date__end_date__lte=end_date
        )

      
        week_start = start_date
        while week_start <= end_date:
            # Calculate the end of the current week (7 days after week_start)
            week_end = min(week_start + timedelta(days=6), end_date)

        
            weekly_sum = reports.filter(
                report_date__start_date__gte=week_start,
                report_date__end_date__lte=week_end
            ).aggregate(
                weekly_sum=Sum('total_amount')
            )['weekly_sum'] or 0 
            
            weekly_data.append({
                'week_start': week_start.strftime('%Y-%m-%d'),
                'week_end': week_end.strftime('%Y-%m-%d'),
                'weekly_sum': weekly_sum
            })

         
            week_start = week_end + timedelta(days=1)

     
        return Response(weekly_data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
