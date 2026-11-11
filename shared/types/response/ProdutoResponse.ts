import type { Status } from "../enumeration/Status";
import type { CategoriaProdutoResponse } from "./CategoriaProdutoResponse";
import type { ComponenteResponse } from "./ComponenteResponse";

export interface ProdutoResponse {
    id: number;
    nome: string;
    codigo?: string;
    descricao?: string;
    urlFoto?: string;
    categoria?: CategoriaProdutoResponse;
    componentes: ComponenteResponse[];
    quantAtual: number;
    quantMinima: number;
    status: Status;
    dataCriacao: Date;
    markup: number;
    valorVenda: number;
    custoMaterial: number;
    dataModificacao: Date;
}