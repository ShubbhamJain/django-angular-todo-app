import { Subscription } from 'rxjs'
import { Component, OnInit } from '@angular/core'

import { UiService } from 'src/app/services/ui.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'ToDo App'
  showAddTask!: boolean
  showEditTask!: boolean
  subscription!: Subscription
  editSubscription!: Subscription

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value))

    this.editSubscription = this.uiService.onEditToggle().subscribe((value) => {
      this.uiService.toggleAddTask()
      this.showEditTask = value.show
    })
  }

  ngOnInit(): void {}

  toggleAddTask() {
    this.uiService.toggleAddTask()
  }
}
