from rest_framework.serializers import ModelSerializer

from .models import Task, User


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "id",
            "taskName",
            "taskDescription",
            "completed",
            "updated",
            "created",
        )


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]
