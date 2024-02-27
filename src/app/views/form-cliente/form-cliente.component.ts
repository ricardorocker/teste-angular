import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, catchError, of, tap } from 'rxjs';
import { ClienteService } from '../../services/cliente.service';
import { cpfValidator } from '../../validators/cpf.validator';
import { idadeValidator } from '../../validators/idade.validator';
import { nomeValidator } from '../../validators/nome.validator';

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
      nome: ['', [Validators.required, nomeValidator()]],
      cpf: ['', [Validators.required, cpfValidator()]],
      dataNascimento: ['', [Validators.required, idadeValidator()]],
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

  getErrorMessage(controlName: string, labelName?: string): string {
    const formControl = this.form.get(controlName);

    if (formControl?.touched) {
      const customErrors = ['nomeInvalido', 'cpfInvalido', 'idadeInvalida'];

      switch (true) {
        case formControl?.hasError('required'):
          return `${labelName} é obrigatório`;
        case formControl?.hasError('email'):
          return 'E-mail inválido';
        case customErrors.some((error) => formControl?.hasError(error)):
          return formControl.errors?.['message'];
      }
    }

    return '';
  }

  onCardClick() {
    this.router.navigateByUrl('clientes');
  }

  onOverlayClick(event: Event) {
    event.stopPropagation();
  }
}
