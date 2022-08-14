import { Subscription } from 'rxjs'
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { Component, EventEmitter, OnInit, Output } from '@angular/core'

import { UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  taskName!: string
  showAddTask!: boolean
  taskNameError!: string
  taskDescription?: string
  subscription!: Subscription
  faStarOfLife = faStarOfLife

  @Output() onAddTask: EventEmitter<{
    taskName: string
    taskDescription?: string
  }> = new EventEmitter()

  // eslint-disable-next-line no-useless-constructor
  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value))
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.taskName || !this.taskName.length) {
      this.taskNameError = 'Please Input To Do'
      return
    } else {
      this.taskNameError = ''
    }

    const newToDo = {
      taskName: this.taskName,
      taskDescription: this.taskDescription
    }

    this.onAddTask.emit(newToDo)

    this.taskName = ''
    this.taskDescription = ''
  }
}
