import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'teste-angular';
  clientes: Cliente[] = [
    {
      "id": 1,
      "nome": "Ricardo Rosa Rocker s",
      "cpf": "44267258544",
      "dataNascimento": "1995-09-04",
      "rendaMensal": 24400,
      "email": "ricardo.santos.rocker@gmail.com",
      "dataCadastro": "2023-12-08"
    },
    {
      "id": 2,
      "nome": "Petrucia Lira Soaresss",
      "cpf": "45678912311",
      "dataNascimento": "1997-12-10",
      "rendaMensal": 7900,
      "email": "lirapetrucia@gmail.com",
      "dataCadastro": "2023-12-14"
    }
  ]

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClients().subscribe((clientes) => console.log(clientes));
  }
}
