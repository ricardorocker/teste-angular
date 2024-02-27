import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Cliente } from '../models/cliente';
import { v4 as uuidv4 } from 'uuid';
import { Params } from '../models/params';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getPaginateClients(params: Params): Observable<Cliente[]> {
    let paramsApi = new HttpParams()
      .set('_page', params.currentPage.toString())
      .set('_limit', params.clientsPerPage.toString())
      .set('_sort', params.field ? params.field : '')
      .set('_order', params.order ? params.order : '');

    if (params.filtros) {
      Object.keys(params.filtros).forEach((key) => {
        if (params.filtros && params.filtros[key]) {
          paramsApi = paramsApi.set(`${key}_like`, params.filtros[key]);
        }
      });
    }

    return this.http.get<Cliente[]>(this.apiUrl, { params: paramsApi });
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
