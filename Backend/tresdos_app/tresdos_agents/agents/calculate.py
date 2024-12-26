from tresdos_agents.models import HeadAgent, MidAgent, BaseAgent, ReportDate, AgentIncomeReport

def calculate_report(data, report_date):
    # Create the ReportDate object for this week's report
    report_date = ReportDate.objects.create(start_date=report_date['startDate'], end_date=report_date['endDate'])

    for agent in data:
        if agent['type'] == 'headAgent':
            # Handle Head Agent Calculation
            head_agent = HeadAgent.objects.get(id=agent['id'])
            percentage = head_agent.percentage / 100.0  # Convert percentage to decimal
            commission = agent['commission'] * percentage  # Calculate commission
            
            # Initially, the head agent's commission is their calculated income
            head_agent_income = commission

            # Create a new report entry for the head agent for this week
            head_report = AgentIncomeReport.objects.create(
                report_date=report_date,
                agent_name=head_agent.name,
                agent_role='head_agent',
                total_amount=agent['commission'],  # The commission is the total amount
                percentage=head_agent.percentage,
                parent_percentage=0,  # No parent percentage for Head Agent
                income=head_agent_income  # The initial income
            )

            # If HeadAgent has MidAgents, calculate their contributions and add to HeadAgent's income
            mid_agents = MidAgent.objects.filter(head_agent=head_agent)
            for mid_agent in mid_agents:
                mid_percentage = mid_agent.percentage / 100.0
                mid_commission = agent['commission'] * mid_percentage

                # MidAgent gets their commission
                mid_agent_income = mid_commission

                # If MidAgent has a parent_percentage, it will be added to HeadAgent's income
                parent_commission = mid_agent.parent_percentage / 100.0 * mid_commission  # Parent commission from MidAgent

                # Add the Parent Percentage to the HeadAgent's income
                head_agent_income += parent_commission

                # Create a new report entry for MidAgent
                mid_report = AgentIncomeReport.objects.create(
                    report_date=report_date,
                    agent_name=mid_agent.name,
                    agent_role='mid_agent',
                    total_amount=mid_commission,
                    percentage=mid_agent.percentage,
                    parent_percentage=mid_agent.parent_percentage,
                    income=mid_agent_income  # MidAgent's income
                )

                # Now add the parent income to the HeadAgent's income (no new column, just updating the existing income)
                head_report.income = head_agent_income  # Update HeadAgent income with parent commission
                head_report.save()

                # If MidAgent has BaseAgents, calculate their contributions
                base_agents = BaseAgent.objects.filter(mid_agent=mid_agent)
                for base_agent in base_agents:
                    base_percentage = base_agent.percentage / 100.0
                    base_commission = agent['commission'] * base_percentage
                    base_parent_commission = base_agent.parent_percentage / 100.0 * base_commission  # Parent Percentage from BaseAgent

                    # Create a new report entry for BaseAgent
                    base_agent_income = base_commission
                    base_report = AgentIncomeReport.objects.create(
                        report_date=report_date,
                        agent_name=base_agent.name,
                        agent_role='base_agent',
                        total_amount=base_commission,
                        percentage=base_agent.percentage,
                        parent_percentage=base_agent.parent_percentage,
                        income=base_agent_income  # BaseAgent's income
                    )

                    # Add the Parent Percentage to MidAgent and HeadAgent as additional income
                    mid_agent_income += base_parent_commission #* (mid_agent.percentage / 100.0)  # Add parent to MidAgent
                    head_agent_income += base_parent_commission #* (head_agent.percentage / 100.0)  # Add parent to HeadAgent

                    # Update MidAgent and HeadAgent reports with the new income
                    mid_report.income = mid_agent_income  # Update MidAgent's income
                    mid_report.save()

                    head_report.income = head_agent_income  # Update HeadAgent's income with base parent contribution
                    head_report.save()

            # Final update for HeadAgent's income after calculating all parent percentages
            head_report.income = head_agent_income  # Total commission for HeadAgent including parent income
            head_report.save()
