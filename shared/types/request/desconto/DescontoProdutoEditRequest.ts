import type {TipoValorDesconto} from "../.."

export interface DescontoProdutoEditRequest {
    nome: string,
    valor: number,
    tipoValor: TipoValorDesconto
    idProduto?: number
}