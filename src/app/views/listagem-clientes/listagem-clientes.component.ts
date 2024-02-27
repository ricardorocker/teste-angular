import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Params } from 'src/app/models/params';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.scss'],
})
export class ListagemClientesComponent implements OnInit {
  clientes!: Cliente[];
  clienteSelecionado?: Cliente | null;
  showModal: boolean = false;
  feedbackMessage: string = '';
  successMessage: boolean = true;
  currentPageData$!: Observable<Cliente[]>;
  params: Params = {
    currentPage: 1,
    clientsPerPage: 6,
    field: undefined,
    order: undefined,
    filtros: {},
  };
  disableNextButton: boolean = false;
  disablePrevButton: boolean = true;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.currentPageData$ = this.clienteService.getPaginateClients(
      this.params
    );
  }

  filter(): void {
    this.params.currentPage = 1;
    this.loadData();
  }

  addButton(): void {
    this.router.navigate(['/clientes/view']);
  }

  viewButton(): void {
    if (this.clienteSelecionado) {
      const clienteId = this.clienteSelecionado.id;
      this.router.navigate(['/clientes/view', clienteId]);
    } else {
      this.showFeedback('Selecione um cliente para visualiza-lo.', false);
    }
  }

  removeButton(): void {
    if (this.clienteSelecionado) {
      const clienteId = this.clienteSelecionado.id;
      this.clienteService
        .delete(clienteId)
        .pipe(
          tap(() => {
            this.showFeedback('Cliente removido com sucesso!', true);
            this.loadData();
          }),
          catchError((res) => {
            const errorMessage = `Erro ao remover cliente: ${res.error}`;
            this.showFeedback(errorMessage, false);
            return of(null);
          })
        )
        .subscribe();
    } else {
      this.showFeedback('Selecione um cliente para remove-lo.', false);
    }
  }

  sort(orderState: any[]): void {
    const asc: boolean = orderState[0];
    const field: string = orderState[1];

    asc
      ? (this.params.order = 'asc')
      : (this.params.order = 'desc');
    this.params.field = field;

    if (this.params.currentPage !== 1)
      this.params.currentPage = 1;

    this.loadData();
  }

  changePage(offset: number) {
    this.params.currentPage += offset;

    this.clienteService
      .getPaginateClients(this.params)
      .subscribe((data) => {
        if (data.length > 0) {
          this.currentPageData$ = of(data);
          this.disablePrevButton = this.params.currentPage === 1;
          this.disableNextButton =
            data.length < this.params.clientsPerPage;
        } else {
          this.disableNextButton = true;
        }
      });
  }

  selectedClient(cliente: Cliente | null): void {
    this.clienteSelecionado = cliente;
  }

  showFeedback(message: string, successMessage: boolean): void {
    this.feedbackMessage = message;
    this.successMessage = successMessage;
    this.showModal = true;
  }

  onCardClick() {
    this.showModal = false;
  }

  onOverlayClick(event: Event) {
    event.stopPropagation();
  }
}
