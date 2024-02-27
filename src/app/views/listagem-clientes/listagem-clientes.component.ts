import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { Filtros } from 'src/app/models/filtros';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.scss']
})
export class ListagemClientesComponent implements OnInit {
  clientes!: Cliente[]
  clienteSelecionado?: Cliente | null;
  filtros: Filtros = {};
  showModal: boolean = false;
  feedbackMessage: string = '';
  successMessage: boolean = true;

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.clienteService.getClients().subscribe((clientes: Cliente[]) => this.clientes = clientes);
  }

  filter(): void {
    // TODO: Implementar
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
      this.clienteService.delete(clienteId).pipe(
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
