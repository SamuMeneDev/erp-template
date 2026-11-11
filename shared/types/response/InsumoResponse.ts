import type { Status } from "../enumeration/Status";
import type { CategoriaInsumoResponse } from "./CategoriaInsumoResponse";

export interface InsumoResponse {
    id: number;
    nome: string;
    preco: number;
    categoria?: CategoriaInsumoResponse,
    quantMinima: number,
    quantAtual: number,
    dataCriacao: Date,
    dataModificacao: Date,
    status: Status,
    urlFoto?: string,

}