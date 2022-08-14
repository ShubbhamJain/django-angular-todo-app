from django.urls import path

from . import views

urlpatterns = [
    path("api/", views.getRoutes),
    path("api/tasks", views.getTasks),
    path("api/addTask", views.addTask),
    path("api/login", views.loginUser),
    path("api/logout", views.logoutUser),
    path("api/getUsers", views.getUsers),
    path("api/register", views.registerUser),
    path("api/updateTask/<str:taskId>", views.updateTask),
    path("api/deleteTask/<str:taskId>", views.deleteTask),
]
