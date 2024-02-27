# Projeto Angular de CRUD de Clientes
Bem-vindo ao repositório do projeto CRUD de Clientes desenvolvido em Angular. 
Este projeto inclui funcionalidades de listagem, formulário, estilos personalizados, serviços, pipes, validadores, modelos e componentes reutilizáveis.

## [Video de Demonstração] - em breve
![image](https://github.com/ricardorocker/teste-angular/assets/76121782/e9c85b2f-32f7-4e4c-927d-3ed6d58a8c29)


## Estrutura do Projeto
### Views
- Listagem Component
- Formulário Component

### Estilos
- _variables.scss: Arquivo de variáveis para a estilização consistente.

### Serviços
- Cliente.service.ts: Serviço responsável por interagir com a API fake para operações CRUD de clientes.

### Pipes
- Cpf.pipe.ts: Pipe personalizado para formatar exibição de CPF.

### Validadores
- cpf.validator.ts: Validador personalizado para CPF.
- idade.validator.ts: Validador personalizado para idade.
- nome.validator.ts: Validador personalizado para nome.

### Modelos
- Cliente.ts: Modelo de dados para representar um cliente.
- Filtros.ts: Modelo de dados para representar filtros aplicáveis à listagem de clientes.
- Params.ts: Modelo de dados para representar configuração de paginação da listagem de clientes.

### Componentes Reutilizáveis
- Modal message
- Header
- Button
- Control error
- Table list


## Capturas de Tela

### Tela Principal
![image](https://github.com/ricardorocker/teste-angular/assets/76121782/c261f070-0348-4916-b1a6-c8a85377b167)


### Tela de Edição
![image](https://github.com/ricardorocker/teste-angular/assets/76121782/5a892b60-903d-4f0f-8686-19a2d7126579)


### Card de feedback
![image](https://github.com/ricardorocker/teste-angular/assets/76121782/408cdf8f-194d-443e-b4be-a00026441cf8)



## Conhecimentos Técnicos Utilizados
- Criação de protótipo personalizado em Figma
- Criação de variáveis SCSS seguindo cores, tamanhos e pesos de fontes
- Estilos gerais
- Criação de dumb componentes
- @Input, @Output
- Interpolation
- ngOnInit
- ngIf, ngFor, ngTemplate, ngContainer
- ngModel, ngClass
- ReactiveForms, FormControls, FormValidators
- patchValue
- Custom Validators: ValidatorFn, ValidationErrors
- Mensagens de erros customizadas
- Máscaras (Ngx Masks)
- Pipes
- Custom Pipes (PipeTransform)
- Overlay
- Route, Route ID
- Service: HttpClient, HttpParams, GET, PUT, POST, DELETE
- RxJS: pipe, tap, map, switchMap, catchError
- Interfaces (Model)
- Card de feedback
- HttpParams: Filtro, Paginação, Ordenação
- JSON-Server (API Fake)

## Como Executar o Projeto

Para executar o projeto localmente, siga os passos descritos anteriormente. Certifique-se de ter o Node.js e o Angular CLI instalados em sua máquina.

```bash
# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
ng serve

# Acesse a aplicação no navegador em http://localhost:4200/
```

#### Iniciar o JSON Server (API Fake)

O projeto depende de uma API fake fornecida pelo JSON Server para simular operações de CRUD. Certifique-se de iniciar o JSON Server antes de executar a aplicação Angular.

```bash
# Instalar o JSON Server globalmente (caso ainda não tenha)
npm install -g json-server

# Iniciar o JSON Server (a partir da raiz do projeto)
json-server --watch db.json
````

## Contato
Sinta-se à vontade para entrar em contato para mais informações ou esclarecimentos sobre o projeto.

- Nome: Ricardo Rocker
- Email: ricardo.santos.rocker@gmail.com
- GitHub: [GitHub Profile](https://github.com/ricardorocker)
- Website: [Ricardo Rocker's Website](https://ricardorocker.com/)
- Linkedin: [Ricardo Rocker's Linkdin](https://www.linkedin.com/in/ricardo-s-rocker/)
- Instagram: [Ricardo Rocker's Instagram](https://www.instagram.com/ricardorocker.developer/)
