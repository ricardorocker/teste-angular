export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    dataNascimento: Date | string;
    rendaMensal: number;
    email: string;
    dataCadastro: Date | string;
}
