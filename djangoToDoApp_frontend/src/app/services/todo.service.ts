import { Injectable } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { environment } from '../../environments/environment'

import {
  AddToDosBackendRes,
  authBackendRes,
  editToDo,
  ToDo,
  ToDosBackendRes
} from 'src/app/interfaces'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  token = this.authService.getAuthInfo()
  subscription!: Subscription

  constructor(private http: HttpClient, private authService: AuthService) {
    this.subscription = authService
      .getToken()
      .subscribe((value) => (this.token = value))
  }

  setHttpHeader() {
    let token = ''

    if (!this.token) token = this.authService.getAuthInfo()
    else token = this.token

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token
      })
    }
    return httpOptions
  }

  getToDo(): Observable<ToDosBackendRes> {
    this.httpOptions = this.setHttpHeader()
    return this.http.get<ToDosBackendRes>(
      environment.apiUrl + 'tasks',
      this.httpOptions
    )
  }

  addToDo(todo: {
    taskName: string
    taskDescription?: string
  }): Observable<AddToDosBackendRes> {
    this.httpOptions = this.setHttpHeader()
    return this.http.post<AddToDosBackendRes>(
      environment.apiUrl + 'addTask',
      todo,
      this.httpOptions
    )
  }

  updateToDo(todo: ToDo | editToDo): Observable<AddToDosBackendRes> {
    this.httpOptions = this.setHttpHeader()
    return this.http.put<AddToDosBackendRes>(
      environment.apiUrl + 'updateTask' + `/${todo.id}`,
      todo,
      this.httpOptions
    )
  }

  deleteToDo(todo: ToDo): Observable<ToDosBackendRes> {
    this.httpOptions = this.setHttpHeader()
    return this.http.delete<ToDosBackendRes>(
      environment.apiUrl + 'deleteTask' + `/${todo.id}`,
      this.httpOptions
    )
  }

  logout(): Observable<authBackendRes> {
    this.httpOptions = this.setHttpHeader()
    return this.http.post<authBackendRes>(
      environment.apiUrl + 'logout',
      {},
      this.httpOptions
    )
  }
}
