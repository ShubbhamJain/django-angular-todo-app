import { faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { editToDo, ToDo } from 'src/app/interfaces'
import { UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  taskName?: string
  taskDescription?: string
  faStarOfLife = faStarOfLife

  @Input() todo!: ToDo

  @Output() onEditTask: EventEmitter<editToDo> = new EventEmitter()

  // eslint-disable-next-line no-useless-constructor
  constructor(private uiService: UiService) {}

  ngOnInit(): void {}

  closeEdit() {
    this.uiService.toggleEditTask(this.todo)
  }

  onSubmit() {
    const todoData: editToDo = {
      id: this.todo.id
    }

    if (this.taskName?.length) {
      todoData.taskName = this.taskName
    }

    if (this.taskDescription?.length) {
      todoData.taskDescription = this.taskDescription
    }

    this.onEditTask.emit(todoData)

    this.taskName = ''
    this.taskDescription = ''

    this.uiService.toggleEditTask(this.todo)
  }
}
