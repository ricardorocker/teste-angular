import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input() clientes!: Cliente[];
  @Output() selectedClient: EventEmitter<Cliente | null> = new EventEmitter<Cliente | null>();

  clienteSelecionado?: Cliente | null;

  constructor() { }

  ngOnInit(): void {
  }

  selectClient(cliente: Cliente): void {
    this.clienteSelecionado =
      this.clienteSelecionado === cliente ? null : cliente;
    this.selectedClient.emit(this.clienteSelecionado);
  }
}
