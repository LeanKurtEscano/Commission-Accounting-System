from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', views.register_admin, name= "register-admin"),
    path('logout/', views.log_out, name="logout"),
    path('login/', views.user_login , name="user-login"),
    path('token/', TokenObtainPairView.as_view(), name="get_token"),
    path('refresh/', TokenRefreshView.as_view(), name="refresh_token"),
    path('otp/', views.reset_password_email, name="reset-password"),
    path('otp/resend/', views.resend_otp,name="resend-otp")
]
