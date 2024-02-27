import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() textButton!: string;
  @Input() isPrimary: boolean = true;
  @Input() width?: number;

  constructor() { }

  onClick() {
    this.buttonClick.emit();
  }

}
