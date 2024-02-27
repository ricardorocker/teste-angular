export interface Params {
    currentPage: number;
    clientsPerPage: number;
    field?: string;
    order?: string;
    filtros: { [key: string]: any };
}
