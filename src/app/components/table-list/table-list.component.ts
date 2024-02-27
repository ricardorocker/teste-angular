import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Cliente } from '../../models/cliente';
import { Params } from '../../models/params';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent {
  @Input() clientes!: Cliente[] | null;
  @Input() params!: Params;
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
