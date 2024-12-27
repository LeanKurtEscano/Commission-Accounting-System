from tresdos_agents.models import HeadAgent, MidAgent, BaseAgent, ReportDate, AgentIncomeReport

from tresdos_agents.models import HeadAgent, MidAgent, BaseAgent, ReportDate, AgentIncomeReport

def calculate_report(data, report_date):
    # Create the ReportDate object for this week's report
    report_date = ReportDate.objects.create(start_date=report_date['startDate'], end_date=report_date['endDate'])

    # Step 1: Preprocess data
    agent_by_id = {agent['id']: agent for agent in data}  # Mapping agents by their ID
    agents_by_type = {
        'headAgent': [agent for agent in data if agent['type'] == 'headAgent'],
        'middleAgent': [agent for agent in data if agent['type'] == 'middleAgent'],
        'baseAgent': [agent for agent in data if agent['type'] == 'baseAgent']
    }

    # Step 2: Process head agents
    for head_agent_data in agents_by_type['headAgent']:
        head_agent = HeadAgent.objects.get(id=head_agent_data['id'])
        if head_agent.id == head_agent_data['id']:  # Ensure ID matches
            percentage = head_agent.percentage / 100.0  
            commission = head_agent_data['commission'] * percentage 

            # Initially, the head agent's commission is their calculated income
            head_agent_income = commission

            # Create a new report entry for the head agent
            head_report = AgentIncomeReport.objects.create(
                report_date=report_date,
                agent_name=head_agent.name,
                agent_role='head_agent',
                total_amount=head_agent_data['commission'],  # Total amount
                percentage=head_agent.percentage,
                parent_percentage=0,  # No parent percentage for head agents
                income=head_agent_income
            )

            # Step 3: Find related mid agents
            mid_agents = [agent for agent in agents_by_type['middleAgent'] if agent['parentId'] == head_agent_data['id']]
            for mid_agent_data in mid_agents:
                mid_agent = MidAgent.objects.get(id=mid_agent_data['id'])
                if mid_agent.id == mid_agent_data['id']:  # Ensure ID matches
                    mid_percentage = mid_agent.percentage / 100.0
                    mid_commission = mid_agent_data['commission'] * mid_percentage

                    # MidAgent gets their commission
                    mid_agent_income = mid_commission

                    # Add parent commission from mid agent to head agent
                    parent_head_percentage = mid_agent.parent_percentage / 100.0
                    parent_head_additional = mid_agent_data['commission'] * parent_head_percentage
                    head_agent_income += parent_head_additional

                    # Create a report entry for the mid agent
                    mid_report = AgentIncomeReport.objects.create(
                        report_date=report_date,
                        agent_name=mid_agent.name,
                        agent_role='mid_agent',
                        total_amount=mid_agent_data['commission'],
                        percentage=mid_agent.percentage,
                        parent_percentage=mid_agent.parent_percentage,
                        income=mid_agent_income
                    )

                    # Step 4: Find related base agents
                    base_agents = [agent for agent in agents_by_type['baseAgent'] if agent['parentId'] == mid_agent_data['id']]
                    for base_agent_data in base_agents:
                        base_agent = BaseAgent.objects.get(id=base_agent_data['id'])
                        if base_agent.id == base_agent_data['id']:  # Ensure ID matches
                            base_percentage = base_agent.percentage / 100.0
                            base_commission = base_agent_data['commission'] * base_percentage

                            # BaseAgent gets their commission
                            base_agent_income = base_commission

                            # Add parent commission from base agent to mid agent and head agent
                            base_parent_commission = base_agent.parent_percentage / 100.0
                            base_parent_additional = base_agent_data['commission'] * base_parent_commission
                            mid_agent_income += base_parent_additional
                            head_agent_income += base_parent_additional

                            # Create a report entry for the base agent
                            base_report = AgentIncomeReport.objects.create(
                                report_date=report_date,
                                agent_name=base_agent.name,
                                agent_role='base_agent',
                                total_amount=base_agent_data['commission'],
                                percentage=base_agent.percentage,
                                parent_percentage=base_agent.parent_percentage,
                                income=base_agent_income
                            )

                    # Update mid agent's income after processing base agents
                    mid_report.income = mid_agent_income
                    mid_report.save()

            # Update head agent's income after processing mid agents
            head_report.income = head_agent_income
            head_report.save()
