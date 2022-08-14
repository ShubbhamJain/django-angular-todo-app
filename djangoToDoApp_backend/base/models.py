from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(max_length=200)
    email = models.EmailField(unique=True)

    USERNAME_FIELD: str = "email"
    REQUIRED_FIELDS: list[str] = ["username"]


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    taskName = models.CharField(max_length=200)
    taskDescription = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-updated", "-created"]

    def __str__(self):
        return self.taskName
