from django.urls import  path
from . import views
urlpatterns = [
    path('total/',views.get_total_sales,name="total"),
    path('share/',views.get_total_share,name="share"),
    path('count/',views.get_count_agents,name="count"),
    path('latest/', views.get_latest_reports,name="latest-reports"),
    path('current/', views.get_current_month_sum,name="current-month"),
    path('monthly/', views.get_monthly_sum ,name="current-month"),
    
    
]
