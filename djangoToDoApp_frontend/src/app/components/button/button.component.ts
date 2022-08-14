import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text!: string
  @Input() color!: string
  @Output() btnClick = new EventEmitter()

  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit()
  }
}
