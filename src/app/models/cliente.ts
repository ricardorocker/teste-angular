export interface Cliente {
    id: string;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    rendaMensal: number;
    email: string;
    dataCadastro: Date | string;
}
