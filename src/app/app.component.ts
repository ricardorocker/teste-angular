import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'teste-angular';

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClients().subscribe((clientes) => console.log(clientes));
  }
}
