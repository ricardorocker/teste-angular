import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ListagemClientesComponent } from './views/listagem-clientes/listagem-clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormClienteComponent } from './views/form-cliente/form-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TableListComponent,
    ModalMessageComponent,
    ControlErrorComponent,
    ListagemClientesComponent,
    FormClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
