import { Observable, Subject } from 'rxjs'
import { Injectable } from '@angular/core'

import { ToDo } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false
  private showEditTask: boolean = false
  private subject = new Subject<any>()
  private editSubject = new Subject<{ show: boolean; todo: ToDo }>()

  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask
    this.subject.next(this.showAddTask)
  }

  toggleEditTask(todo: ToDo): void {
    this.showEditTask = !this.showEditTask
    this.editSubject.next({ show: this.showEditTask, todo })
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable()
  }

  onEditToggle(): Observable<{ show: boolean; todo: ToDo }> {
    return this.editSubject.asObservable()
  }
}
