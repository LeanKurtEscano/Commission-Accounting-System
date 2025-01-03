# Generated by Django 5.1.4 on 2024-12-23 11:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HeadAgent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('percentage', models.IntegerField()),
                ('role', models.CharField(default='head_agent', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='MidAgent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('percentage', models.IntegerField()),
                ('role', models.CharField(default='mid_agent', max_length=50)),
                ('head_agent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tresdos_agents.headagent')),
            ],
        ),
        migrations.CreateModel(
            name='BaseAgent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('percentage', models.IntegerField()),
                ('role', models.CharField(default='base_agent', max_length=50)),
                ('head_agent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tresdos_agents.headagent')),
                ('mid_agent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tresdos_agents.midagent')),
            ],
        ),
    ]
