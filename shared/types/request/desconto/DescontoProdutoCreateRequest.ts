import type { TipoValorDesconto } from "../../enumeration/ETipoValorDesconto"

export interface DescontoProdutoCreateRequest {
        nome: string,
        valor: number,
        tipoValor: TipoValorDesconto
        idProduto?: number
}