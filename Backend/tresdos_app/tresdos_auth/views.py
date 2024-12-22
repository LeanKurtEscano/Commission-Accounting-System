from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.core.cache import cache
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_out(request):
    logout(request)
    return Response({'success': 'Logged out successfully'},status=status.HTTP_200_OK)

@api_view(["POST"])
def user_login(request):

    try:
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response({"error": "Please fill out all the fields"}, status= status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(username=username).first()
        
        if not user:
            return Response({"error": "User doesn't exist"}, status= status.HTTP_404_NOT_FOUND)
        
        user = user.username
        
        user_auth  = authenticate(request, username = user , password = password)
        
        if user_auth is None:
            return Response({"error":"Your password is incorrect"}, status= status.HTTP_401_UNAUTHORIZED)
        
        get_token = RefreshToken.for_user(user_auth)
        
        return Response({"success": "User has successfully login",
                         "refresh": str(get_token),
                         "access": str(get_token.access_token)}, status= status.HTTP_200_OK)
        
        
        
    
    
    except Exception as e:
        return Response({"error": "Something went wrong. Please try again later"}, status= status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    
    
    
    
@api_view(["POST"])
def register_admin(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    user = User.objects.create(
        username = username,
        password = make_password(password)
    )
    
    user.save()
    return Response({"success": "User registered"}, status= status.HTTP_200_OK)