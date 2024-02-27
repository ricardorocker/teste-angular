import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClientesComponent } from './views/listagem-clientes/listagem-clientes.component';
import { FormClienteComponent } from './views/form-cliente/form-cliente.component';

const routes: Routes = [
  {
    path: 'clientes',
    title: 'Clientes Listagem',
    component: ListagemClientesComponent,
  },
  {
    path: 'clientes/view',
    component: FormClienteComponent,
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
