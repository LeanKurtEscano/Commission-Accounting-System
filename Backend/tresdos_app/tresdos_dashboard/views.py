from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from tresdos_agents.models import AgentIncomeReport,BaseAgent,HeadAgent,MidAgent,ReportDate
from django.db.models import Sum,Count
from datetime import datetime,timedelta,timezone
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
            return Response({"error": "Invalid month name"}, status=400)

        current_year = datetime.now().year


      
        month_number = list(calendar.month_name).index(month_name)

      
        start_date = datetime(current_year, month_number, 1)
        end_date = datetime(current_year, month_number, calendar.monthrange(current_year, month_number)[1])

        report_dates = ReportDate.objects.filter(
            start_date__gte=start_date,
            end_date__lte=end_date
        ).order_by('start_date')

        
        weekly_data = {}
        week_count = 1

       
        for report_date in report_dates:
            # Aggregate total_amount for the current report_date
            total_sum = AgentIncomeReport.objects.filter(
                report_date=report_date
            ).aggregate(total_amount_sum=Sum('total_amount'))['total_amount_sum'] or 0

          
            if total_sum > 0:
                weekly_data[f'week{week_count}'] = total_sum
                week_count += 1 

        return Response(weekly_data, status=200)

    except Exception as e:
      
        return Response({"error": str(e)}, status=500)




@api_view(["GET"])
def agent_total_summary(request):
    summary = []

    
    for head in HeadAgent.objects.all():
        head_agent_reports = AgentIncomeReport.objects.filter(agent_role='head_agent', agent_id=head.id)
        aggregate_data = head_agent_reports.aggregate(
            total_amount=Sum('total_amount'), total_income=Sum('income')
        )

        summary.append({
            'name': head.name,
            'role': 'head_agent',
            'totalAmount': aggregate_data['total_amount'] or 0,
            'totalIncome': aggregate_data['total_income'] or 0,
        })

    
    for mid in MidAgent.objects.all():
        mid_agent_reports = AgentIncomeReport.objects.filter(agent_role='mid_agent', agent_id=mid.id)
        aggregate_data = mid_agent_reports.aggregate(
            total_amount=Sum('total_amount'), total_income=Sum('income')
        )

        summary.append({
            'name': mid.name,
            'role': 'mid_agent',
            'totalAmount': aggregate_data['total_amount'] or 0,
            'totalIncome': aggregate_data['total_income'] or 0,
        })

   
    for base in BaseAgent.objects.all():
        base_agent_reports = AgentIncomeReport.objects.filter(agent_role='base_agent', agent_id=base.id)
        aggregate_data = base_agent_reports.aggregate(
            total_amount=Sum('total_amount'), total_income=Sum('income')
        )

        summary.append({
            'name': base.name,
            'role': 'base_agent',
            'totalAmount': aggregate_data['total_amount'] or 0,
            'totalIncome': aggregate_data['total_income'] or 0,
        })

    return Response(summary, status=status.HTTP_200_OK)



@api_view(["GET"])
def get_yearly_sales(request):
 
    current_year = datetime.now().year

   


    # Define the date range for the year
    start_date = datetime(current_year, 1, 1, tzinfo=timezone.utc).date()
    end_date = datetime(current_year, 12, 31, 23, 59, 59, tzinfo=timezone.utc).date()

    # Filter by the ReportDate model
    total_income = AgentIncomeReport.objects.filter(
        report_date__start_date__gte=start_date,
        report_date__end_date__lte=end_date
    ).aggregate(total_amount=Sum('total_amount'))

    
    return Response({
        
        "total": total_income["total_amount"] or 0
    })
