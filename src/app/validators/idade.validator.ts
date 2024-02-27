import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function idadeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const dataNascimento = control.value;

    if (!dataNascimento) return null;

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesHoje = hoje.getMonth() + 1;
    const mesNascimento = nascimento.getMonth() + 1;

    if (
      mesNascimento > mesHoje ||
      (mesNascimento === mesHoje && nascimento.getDate() > hoje.getDate())
    ) {
      idade--;
    }

    if (idade >= 18 && idade <= 60) {
      return null;
    } else {
      return {
        idadeInvalida: true,
        message: 'Idade do cliente deve estar entre 18 e 60 anos.',
      };
    }
  };
}
