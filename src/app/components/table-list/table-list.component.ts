import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input() clientes!: Cliente[] | null;
  @Input() currentPage!: number | null;
  @Input() disableNextButton: boolean = false;
  @Input() disablePrevButton: boolean = true;
  @Output() selectedClient: EventEmitter<Cliente | null> = new EventEmitter<Cliente | null>();
  @Output() orderColumnState: EventEmitter<any> = new EventEmitter<any>();
  @Output() offset: EventEmitter<number> = new EventEmitter<number>();

  clienteSelecionado?: Cliente | null;
  orderState: any = {
    nome: true,
    cpf: true,
    dataCadastro: true,
    rendaMensal: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  selectClient(cliente: Cliente): void {
    this.clienteSelecionado =
      this.clienteSelecionado === cliente ? null : cliente;
    this.selectedClient.emit(this.clienteSelecionado);
  }

  sort(field: string): void {
    this.orderState[field] = !this.orderState[field];

    this.orderColumnState.emit([this.orderState[field], field]);
  }

  nextPage() {
    if (!this.disableNextButton) {
      this.offset.emit(1);
    }
  }

  prevPage() {
    if (!this.disablePrevButton) {
      this.offset.emit(-1);
    }
  }
}
