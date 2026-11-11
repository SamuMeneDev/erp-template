import type {PrecificacaoResponse} from "./PrecificacaoResponse";

/**
 * Interface que tipa a busca dos valores de um produto em uma precificação.
 */
export interface PrecificacaoValorResponse {
    precificacao: PrecificacaoResponse,
    valorVenda: number,
    lucroLiquido: number,
    margemLiquida: number
}