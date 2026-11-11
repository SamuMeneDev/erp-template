import type {TipoValorDesconto} from "../.."

export interface DescontoPrecificacaoCreateRequest {
    nome: string,
    valor: number,
    tipoValor: TipoValorDesconto
    idPrecificacao?: number
}