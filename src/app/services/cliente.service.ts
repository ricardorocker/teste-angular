import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente } from '../models/cliente';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes'

  constructor(private http: HttpClient) { }

  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getById(idCliente: string): Observable<Cliente | {}> {
    return this.getClients().pipe(
      map((clientes: Cliente[]) => {
        const cliente = clientes.find((c: Cliente) => c.id === idCliente);
        return cliente || {};
      })
    );
  }

  save(cliente: Cliente): Observable<Cliente> {
    const id = uuidv4();
    cliente.id = id;
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  update(idCliente: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${idCliente}`, cliente);
  }

  delete(idCliente: string): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${idCliente}`);
  }
}
