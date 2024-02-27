import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Filtros } from 'src/app/models/filtros';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-listagem-clientes',
  templateUrl: './listagem-clientes.component.html',
  styleUrls: ['./listagem-clientes.component.scss']
})
export class ListagemClientesComponent implements OnInit {
  filtros: Filtros = {};
  clientes!: Cliente[]

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClients().subscribe((clientes: Cliente[]) => this.clientes = clientes);
  }

  filter(): void {
    // TODO: Implementar
  }

}
