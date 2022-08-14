import { Observable, Subject } from 'rxjs'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { authBackendRes } from '../interfaces'
import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new Subject<any>()

  // eslint-disable-next-line no-useless-constructor
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token')
  }

  getAuthInfo = () => {
    const data = localStorage.getItem('token')
    if (data) return JSON.parse(data)
    return null
  }

  setAuthInfo(token: string): boolean {
    localStorage.setItem('token', JSON.stringify(token))
    return true
  }

  setToken(token: string): boolean {
    this.tokenSubject.next(token)
    const response = this.setAuthInfo(token)
    return response
  }

  getToken(): Observable<any> {
    return this.tokenSubject.asObservable()
  }

  register(newUser: {
    username: string
    email: string
    password1: string
    password2: string
  }): Observable<authBackendRes> {
    return this.http.post<authBackendRes>(
      environment.apiUrl + 'register',
      newUser,
      httpOptions
    )
  }

  login(user: { email: string; password: string }): Observable<authBackendRes> {
    return this.http.post<authBackendRes>(
      environment.apiUrl + 'login',
      user,
      httpOptions
    )
  }
}
