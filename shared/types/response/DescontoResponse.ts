import type {TipoValorDesconto} from "../enumeration/ETipoValorDesconto";

/**
 * Tipagem que é extendida para todos os tipos de desconto.
 */
export interface Desconto {
    valor: number,
    tipoValor: TipoValorDesconto,
}