import { Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'

import { UiService } from 'src/app/services/ui.service'
import { TodoService } from 'src/app/services/todo.service'
import {
  AddToDosBackendRes,
  authBackendRes,
  editToDo,
  ToDo,
  ToDosBackendRes
} from 'src/app/interfaces'
import { Router } from '@angular/router'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todoToEdit!: ToDo
  todos: ToDo[] = []
  showTaskItem!: boolean
  subscription!: Subscription

  constructor(
    private todoService: TodoService,
    private uiService: UiService,
    private router: Router
  ) {
    this.subscription = this.uiService.onEditToggle().subscribe((value) => {
      this.showTaskItem = value.show
      this.todoToEdit = value.todo
    })
  }

  ngOnInit(): void {
    this.todoService
      .getToDo()
      .subscribe((todos: ToDosBackendRes) => (this.todos = todos.data))
  }

  toggleTodo(todo: ToDo) {
    this.todoService.updateToDo(todo).subscribe()
  }

  deleteTodo(todo: ToDo) {
    this.todoService
      .deleteToDo(todo)
      .subscribe(
        () => (this.todos = this.todos.filter((t) => t.id !== todo.id))
      )
  }

  addTask(todo: { taskName: string; taskDescription?: string }) {
    this.todoService
      .addToDo(todo)
      .subscribe((todos: AddToDosBackendRes) => this.todos.unshift(todos.data))
  }

  editToDo(editToDo: editToDo) {
    this.todoService
      .updateToDo(editToDo)
      .subscribe((editedTodo: AddToDosBackendRes) =>
        this.todos.forEach((todo) => {
          if (todo.id === editedTodo.data.id) {
            todo.taskName = editedTodo.data.taskName
            todo.taskDescription = editedTodo.data.taskDescription
          }
        })
      )
  }

  logout() {
    this.todoService.logout().subscribe((data: authBackendRes) => {
      if (data.success) {
        localStorage.clear()
        this.router.navigate(['/login'])
        return true
      } else {
        console.log(data.errors)
        return false
      }
    })
  }
}
