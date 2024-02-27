import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent {
  @Output() okClick = new EventEmitter<void>();
  @Input() feedbackMessage: string = '';
  @Input() successMessage: boolean = true;

  onOkClick() {
    this.okClick.emit();
  }
}
