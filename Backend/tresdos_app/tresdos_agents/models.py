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
    role = models.CharField(max_length=50, default='mid_agent')
    head_agent = models.ForeignKey(HeadAgent, on_delete=models.CASCADE)

    def __str__(self):
        return f"MidAgent {self.name} - Role: {self.role}, HeadAgent: {self.head_agent.name}"

# BaseAgent Model
class BaseAgent(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.IntegerField()
    role = models.CharField(max_length=50, default='base_agent')
    head_agent = models.ForeignKey(HeadAgent, on_delete=models.CASCADE)
    mid_agent = models.ForeignKey(MidAgent, on_delete=models.CASCADE)

    def __str__(self):
        return f"BaseAgent {self.name} - Role: {self.role}, HeadAgent: {self.head_agent.name}, MidAgent: {self.mid_agent.name}"
