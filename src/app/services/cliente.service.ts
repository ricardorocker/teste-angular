import { HttpClient, HttpParams } from '@angular/common/http';
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

  getPaginateClients(
    page: number,
    clientsPerPage: number,
    field?: string,
    order?: string,
    filters?: any
  ): Observable<Cliente[]> {
    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', clientsPerPage.toString())
      .set('_sort', field ? field : '')
      .set('_order', order ? order : '');

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          params = params.set(`${key}_like`, filters[key]);
        }
      });
    }

    return this.http.get<Cliente[]>(this.apiUrl, { params });
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
