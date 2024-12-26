from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import MidAgent, HeadAgent, BaseAgent
from .agents_json import agents_to_json



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def make_report(request):
    form_data = request.data.get("formData")
    report_date = request.data.get("reportDate")
   
    print(form_data)
    print(report_date)
    
    return Response({"success": "Recieved"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_agents(request):
    try:
       

        agent_type = request.data.get("agentType") 
     
        if agent_type == "Mid Agent":
            mid_agent = MidAgent.objects.all()
            agent_data = [{"id": agent.id, "name": agent.name} for agent in mid_agent]
            return Response({"agents": agent_data}, status=status.HTTP_200_OK)
        
      
        if agent_type == "Head Agent":
            head_agent = HeadAgent.objects.all()
            agent_data = [{"id": agent.id, "name": agent.name} for agent in head_agent]
            return Response({"agents": agent_data}, status=status.HTTP_200_OK)

     
        return Response({"error": "Agent type is not found"}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        
        print("Unexpected Error:", str(e))  #
        return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def display_agents(request):
    json_data = agents_to_json()
    return Response(json_data, status= status.HTTP_200_OK)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_agents(request):
    try:
        agent_name = request.data.get("agentName")
        agent_type = request.data.get("agentType")
        percentage = request.data.get("percentage")
        assigned_head = request.data.get("assignedHeadAgent")
        assigned_middle = request.data.get("assignedMiddleAgent")
        parent_head = request.data.get("parentHeadAgentPercentage")          
        parent_mid = request.data.get("parentMidAgentPercentage")                 
        
      
        if agent_type == "Head Agent":
            head_agent = HeadAgent.objects.create(name=agent_name, percentage=percentage)
            return Response({"success": f"Head Agent {head_agent.name} created"}, status=status.HTTP_201_CREATED)
        
    
        elif agent_type == "Mid Agent":
            if not assigned_head:
                return Response({"error": "A Mid Agent must be associated with a Head Agent"}, status=status.HTTP_400_BAD_REQUEST)
            int_assigned_head = int(assigned_head)
            int_parent_head = int(parent_head)
            head_agent = HeadAgent.objects.get(id=int_assigned_head)  # Get the associated HeadAgent
            mid_agent = MidAgent.objects.create(name=agent_name, percentage=percentage, head_agent=head_agent,parent_percentage = int_parent_head)
            return Response({"success": f"Mid Agent {mid_agent.name} created, assigned to {head_agent.name}"}, status=status.HTTP_201_CREATED)
        
       
        elif agent_type == "Base Agent":
            if not assigned_middle:
                return Response({"error": " A Base Agent must be associated with a Mid Agent"}, status=status.HTTP_400_BAD_REQUEST)
            int_assigned_mid = int(assigned_middle)
            int_parent_mid = int(parent_mid)      
              
            
            mid_agent = MidAgent.objects.get(id=int_assigned_mid)
            head_agent = mid_agent.head_agent  
            
            base_agent = BaseAgent.objects.create(name=agent_name, percentage=percentage, head_agent=head_agent, mid_agent=mid_agent, parent_percentage = int_parent_mid)
            return Response({"success": f"Base Agent {base_agent.name} created, assigned to Head Agent {head_agent.name} and Mid Agent {mid_agent.name}"}, status=status.HTTP_201_CREATED)

        return Response({"error": "Invalid agent type"}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
