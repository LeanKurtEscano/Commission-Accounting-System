from django.core.exceptions import ObjectDoesNotExist
from tresdos_agents.models import HeadAgent, MidAgent, BaseAgent, ReportDate
from django.core.exceptions import ObjectDoesNotExist

def make_update_agent(data):
    agents_by_type = {
        'headAgent': [agent for agent in data if agent['type'] == 'headAgent'],
        'middleAgent': [agent for agent in data if agent['type'] == 'midAgent'],
        'baseAgent': [agent for agent in data if agent['type'] == 'baseAgent'],
    }
    
    for agent in agents_by_type['headAgent']:
        try:
            head_agent = HeadAgent.objects.get(id=agent['id'])
            head_agent.percentage = agent['commission']
            head_agent.save()
        except ObjectDoesNotExist:
            print(f"HeadAgent with ID {agent['id']} does not exist.")
        except Exception as e:
            print(f"Error updating HeadAgent with ID {agent['id']}: {e}")
        
    for agent in agents_by_type['middleAgent']:
        try:
            mid_agent = MidAgent.objects.get(id=agent['id'])
            mid_agent.percentage = agent['commission']
            mid_agent.parent_percentage = agent['parent']
            mid_agent.save()
        except ObjectDoesNotExist:
            print(f"MidAgent with ID {agent['id']} does not exist.")
        except Exception as e:
            print(f"Error updating MidAgent with ID {agent['id']}: {e}")
        
    for agent in agents_by_type['baseAgent']:
        try:
            base_agent = BaseAgent.objects.get(id=agent['id'])
            base_agent.percentage = agent['commission']
            base_agent.parent_percentage = agent['parent']
            base_agent.save()
        except ObjectDoesNotExist:
            print(f"BaseAgent with ID {agent['id']} does not exist.")
        except Exception as e:
            print(f"Error updating BaseAgent with ID {agent['id']}: {e}")
