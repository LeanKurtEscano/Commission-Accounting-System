from django.urls import path
from . import views
urlpatterns = [
    path('agents/', views.create_agents,name="create-agent"),
    path('reports/', views.show_reports,name="show-reports"),
    path('agents/all/',views.get_agents,name="get-agents"),
    path('agents/display/', views.display_agents, name = "display-agents"),
    path('agents/report/', views.make_report, name = "make-reports"),
    path('delete/<int:reportId>/', views.delete_report, name = "delete-reports"),
    path('delete/<int:reportId>/', views.delete_report, name = "delete-reports"),
    path('report/<int:reportId>', views.get_report, name = "get-report")
]
