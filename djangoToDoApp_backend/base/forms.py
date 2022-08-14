from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm

from .models import Task, User


class TaskForm(ModelForm):
    class Meta:
        model = Task
        fields = ["taskName", "taskDescription"]


class MyUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "email", "password1", "password2"]
