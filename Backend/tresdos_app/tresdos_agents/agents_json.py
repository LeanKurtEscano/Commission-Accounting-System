
from .models import HeadAgent, MidAgent,BaseAgent
def agents_to_json():
   
    head_agents = list(HeadAgent.objects.all().values('id', 'name', 'percentage', 'role'))

 
    mid_agents = list(MidAgent.objects.all().values('id', 'name', 'percentage', 'parent_percentage', 'role', 'head_agent'))

    
    base_agents_dict = list(BaseAgent.objects.all().values('id', 'name', 'percentage', 'parent_percentage', 'role', 'head_agent', 'mid_agent'))

    
    structured_data = []

    # Iterate through each head agent and build the nested structure
    for head_agent in head_agents:
        related_mid_agents = [mid for mid in mid_agents if mid['head_agent'] == head_agent['id']]

        # For each related mid agent, filter the base agents related to it
        for mid_agent in related_mid_agents:
            related_base_agents = [
                base for base in base_agents_dict if base['head_agent'] == head_agent['id'] and base['mid_agent'] == mid_agent['id']
            ]
            mid_agent['baseAgents'] = related_base_agents  # Add base agents to the mid agent

        # Build the structure for each head agent
        head_agent['middleAgents'] = related_mid_agents
        structured_data.append(head_agent)  
    return structured_data
