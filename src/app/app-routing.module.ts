import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemClientesComponent } from './views/listagem-clientes/listagem-clientes.component';

const routes: Routes = [
  {
    path: 'clientes',
    title: 'Clientes Listagem',
    component: ListagemClientesComponent,
  },
  { path: '', redirectTo: 'clientes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
