import type {TipoValorDesconto} from "../.."

export interface DescontoPrecificacaoEditRequest {
    nome: string,
    valor: number,
    tipoValor: TipoValorDesconto
    idPrecificacao?: number
}