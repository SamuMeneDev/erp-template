import type { Status } from "../enumeration/Status";

export interface CategoriaInsumoResponse {
    id: number;
    nome: string;
    dataCriacao: Date;
    dataModificacao: Date;
    status: Status
}