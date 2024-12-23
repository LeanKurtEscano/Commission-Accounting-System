from django.urls import path
from . import views
urlpatterns = [
    path('agents/', views.create_agents,name="create-agent"),
    path('agents/all/',views.get_agents,name="get-agents")
]
