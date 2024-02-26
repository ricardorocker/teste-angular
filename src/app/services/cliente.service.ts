import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes'

  constructor(private http: HttpClient) { }

  getClients(): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiUrl);
  }
}
