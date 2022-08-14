from rest_framework import status
from django.db import IntegrityError
from django.contrib.auth import login
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes

from .models import Task, User
from .forms import MyUserCreationForm, TaskForm
from .serializers import TaskSerializer, UserSerializer


@api_view(["GET"])
@permission_classes([AllowAny])
def getRoutes(request: Request):
    routes = [
        "GET /",
        "POST /addTask",
        "GET /tasks",
        "PUT /updateTask",
        "DELETE /deleteTask",
        "POST /register",
        "POST /login",
        "POST /logout",
    ]
    return Response(routes)


@api_view(["GET"])
def getTasks(request: Request):
    try:
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        if serializer.data:
            return Response(
                {
                    "success": True,
                    "errors": None,
                    "status": status.HTTP_200_OK,
                    "data": serializer.data,
                }
            )
        else:
            return Response(
                {
                    "success": True,
                    "errors": "No tasks found",
                    "status": status.HTTP_200_OK,
                    "data": [],
                }
            )
    except:
        return Response(
            {
                "success": False,
                "errors": "Error encountered",
                "status": status.HTTP_404_NOT_FOUND,
                "data": [],
            }
        )


@api_view(["POST"])
def addTask(request: Request):
    if request.method == "POST":
        form = TaskForm(request.data)

        if form.is_valid():
            instance = Task.objects.create(
                user=request.user,
                taskName=request.data.get("taskName"),
                taskDescription=request.data.get("taskDescription"),
            )
            serializer = TaskSerializer(instance, many=False)
            return Response(
                {
                    "success": True,
                    "errors": None,
                    "status": status.HTTP_201_CREATED,
                    "data": serializer.data,
                }
            )
        else:
            print(form.errors.as_data())
            return Response(
                {
                    "success": False,
                    "errors": "Problem in adding task",
                    "status": status.HTTP_400_BAD_REQUEST,
                    "data": None,
                }
            )


@api_view(["PUT"])
def updateTask(request: Request, taskId: str):
    try:
        task: Task = Task.objects.get(id=taskId)
        serializer = TaskSerializer(task, data=request.data, partial=True)

        if request.user != task.user:
            return Response(
                {
                    "success": False,
                    "errors": "UNAUTHORIZED",
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "data": None,
                }
            )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "errors": None,
                    "status": status.HTTP_201_CREATED,
                    "data": serializer.data,
                }
            )
    except Exception as e:
        print(e)

        return Response(
            {
                "success": False,
                "errors": e,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "data": None,
            }
        )


@api_view(["DELETE"])
def deleteTask(request: Request, taskId: str):
    try:
        task: Task = Task.objects.get(id=taskId)

        if request.user != task.user:
            return Response(
                {
                    "success": False,
                    "errors": "UNAUTHORIZED",
                    "status": status.HTTP_401_UNAUTHORIZED,
                    "data": None,
                }
            )

        task.delete()
        serializer = TaskSerializer(task, many=False)
        return Response(
            {
                "success": True,
                "errors": None,
                "status": status.HTTP_200_OK,
                "data": serializer.data,
            }
        )
    except Exception as e:
        print(e)
        return Response(
            {
                "success": False,
                "errors": e,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "data": None,
            }
        )


@api_view(["GET"])
@permission_classes([AllowAny])
def getUsers(request: Request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    if serializer.data:
        return Response(
            {
                "success": True,
                "errors": None,
                "status": status.HTTP_200_OK,
                "data": serializer.data,
            }
        )
    else:
        return Response(
            {
                "success": False,
                "errors": "Error in fetching users",
                "status": status.HTTP_404_NOT_FOUND,
                "data": [],
            }
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def registerUser(request: Request):
    try:
        if request.method == "POST":
            form = MyUserCreationForm(request.data)

            if form.is_valid():
                user = form.save(commit=False)
                user.username = user.username.lower()
                user.save()

                newUser = User.objects.get(email=user.email)
                serializer = UserSerializer(newUser, many=False)

                token = Token.objects.get_or_create(user=user)[0].key
                login(request, user)

                return Response(
                    {
                        "success": True,
                        "errors": None,
                        "status": status.HTTP_200_OK,
                        "user": serializer.data,
                        "token": token,
                    }
                )
            else:
                print(form.errors.as_data())
            return Response(
                {
                    "success": False,
                    "errors": form.errors.as_json(),
                    "status": status.HTTP_400_BAD_REQUEST,
                    "user": None,
                    "token": None,
                }
            )

    except IntegrityError as e:
        print(e)
        account = User.objects.get(username="")
        account.delete()
        return Response(
            {
                "success": False,
                "errors": e,
                "status": status.HTTP_400_BAD_REQUEST,
                "user": None,
                "token": None,
            }
        )
    except KeyError as e:
        print(e)
        return Response(
            {
                "success": False,
                "errors": e,
                "status": status.HTTP_400_BAD_REQUEST,
                "user": None,
                "token": None,
            }
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def loginUser(request: Request):
    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email)
    except BaseException as e:
        return Response(
            {
                "success": False,
                "errors": {"field": "email", "message": "No user found"},
                "status": status.HTTP_404_NOT_FOUND,
                "user": None,
                "token": None,
            }
        )

    if not user.check_password(password):
        return Response(
            {
                "success": False,
                "errors": {
                    "field": "password",
                    "message": "Incorrect Login credentials",
                },
                "status": status.HTTP_404_NOT_FOUND,
                "user": None,
                "token": None,
            }
        )

    token = Token.objects.get_or_create(user=user)[0].key

    if user:
        login(request, user)
        serializer = UserSerializer(user, many=False)
        return Response(
            {
                "success": True,
                "errors": "User logged In Successfully",
                "status": status.HTTP_200_OK,
                "user": serializer.data,
                "token": token,
            }
        )
    else:
        return Response(
            {
                "success": False,
                "errors": {"field": "email", "message": "Account does not exist"},
                "status": status.HTTP_404_NOT_FOUND,
                "user": None,
                "token": None,
            }
        )


@api_view(["POST"])
def logoutUser(request: Request):
    try:
        request.user.auth_token.delete()
        return Response(
            {
                "success": True,
                "errors": "User logged out Successfully",
                "status": status.HTTP_200_OK,
                "user": None,
                "token": None,
            }
        )
    except:
        return Response(
            {
                "success": False,
                "errors": "User logged out Successfully",
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "user": None,
                "token": None,
            }
        )
