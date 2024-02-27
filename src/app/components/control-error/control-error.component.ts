import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss']
})
export class ControlErrorComponent implements OnInit {
  @Input() controlErrorMessage!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
