from django.db import models



class HeadAgent(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.IntegerField()
    role = models.CharField(max_length=50, default='head_agent')

    def __str__(self):
        return f"HeadAgent {self.name} - Role: {self.role}"


class MidAgent(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.IntegerField()
    parent_percentage = models.IntegerField(default=0)
    role = models.CharField(max_length=50, default='mid_agent')
    head_agent = models.ForeignKey(HeadAgent, on_delete=models.CASCADE)

    def __str__(self):
        return f"MidAgent {self.name} - Role: {self.role}, HeadAgent: {self.head_agent.name}"

# BaseAgent Model
class BaseAgent(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.IntegerField()
    parent_percentage = models.IntegerField(default=0)
    role = models.CharField(max_length=50, default='base_agent')
    head_agent = models.ForeignKey(HeadAgent, on_delete=models.CASCADE)
    mid_agent = models.ForeignKey(MidAgent, on_delete=models.CASCADE)

    def __str__(self):
        return f"BaseAgent {self.name} - Role: {self.role}, HeadAgent: {self.head_agent.name}, MidAgent: {self.mid_agent.name}"
    
class ReportDate(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()


class AgentIncomeReport(models.Model):
    report_date = models.ForeignKey(ReportDate, on_delete=models.CASCADE)
    agent_name = models.CharField(max_length=100)
    agent_id = models.IntegerField(null=True, blank=True)

    agent_role = models.CharField(max_length=50)  # e.g., 'head_agent', 'mid_agent', 'base_agent'
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)  # Total input amount
    percentage = models.IntegerField()  # Agent's percentage
    parent_percentage = models.IntegerField(default=0)  # Parent percentage (if applicable)
    income = models.DecimalField(max_digits=12, decimal_places=2)  # Calculated income

    def __str__(self):
        return f"{self.agent_name} ({self.agent_role}) - Income Report for {self.report_date.start_date} to {self.report_date.end_date}"
