import type { Status } from "../../enumeration/Status";

export interface InsumoEditRequest {
    nome: string;
    categoriaId?: number;
    status?: Status
    quantAtual?: number
    preco?: number;
    urlFoto?: string;
}