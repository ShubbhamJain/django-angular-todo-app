import { faPenToSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

import { ToDo } from 'src/app/interfaces'
import { UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: ToDo
  @Output() onDeleteToDo: EventEmitter<ToDo> = new EventEmitter()
  @Output() onToggleToDo: EventEmitter<ToDo> = new EventEmitter()

  faTimes = faTimes
  faPenToSquare = faPenToSquare

  // eslint-disable-next-line no-useless-constructor
  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    if (isNaN(Date.parse(this.todo.created))) return

    const date = new Date(this.todo.created)
    this.todo.created =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
  }

  onToggle(todo: ToDo) {
    todo.completed = !todo.completed
    this.onToggleToDo.emit(todo)
  }

  onEdit(todo: ToDo) {
    this.uiService.toggleEditTask(todo)
  }

  onDelete(todo: ToDo) {
    this.onDeleteToDo.emit(todo)
  }
}
