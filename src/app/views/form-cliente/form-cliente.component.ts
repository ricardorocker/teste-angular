import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of, tap } from 'rxjs';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.scss']
})
export class FormClienteComponent implements OnInit {
  form: FormGroup;
  idCliente?: string;
  sub?: Subscription;
  showModal: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      rendaMensal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataCadastro: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.idCliente = params['id'];
      if (this.idCliente) {
        this.clienteService
          .getById(this.idCliente)
          .pipe(tap((cliente) => this.form.patchValue(cliente)))
          .subscribe();
      }
    });
  }

  cancelButton(): void {
    this.router.navigate(['/clientes']);
  }

  submitButton(): void {
    if (!this.form.valid) {
      Object.values(this.form.controls).forEach((control: AbstractControl) => {
        control.markAsTouched();
      });
      return;
    }

    const clienteForm = this.form.value;

    const onSaveOrUpdate = this.idCliente
      ? this.clienteService.update(clienteForm.id, clienteForm)
      : this.clienteService.save(clienteForm);

    onSaveOrUpdate
      .pipe(
        tap(() => {
          this.showModal = true;
        }),
        catchError((error) => {
          const errorMessage = `Erro ao ${this.idCliente ? 'editar' : 'adicionar'
            } cliente: `;
          console.log(errorMessage, error);
          return of(null);
        })
      )
      .subscribe();
  }

  onCardClick() {
    this.router.navigateByUrl('clientes');
  }

  onOverlayClick(event: Event) {
    event.stopPropagation();
  }
}
