import type { PrecificacaoResponse } from ".."

export interface VendaPrecificacaoDashboardResponse {
    precificacao: PrecificacaoResponse,
    quantidade: number
}
export interface VendaDashboardDiasResponse {
    dia: string, 
    quantidade: number
}
export interface VendaDashboardResponse {
    lucroLiquidoSemana: number,
    lucroLiquidoDia: number,
    fatLiquidoSemana: number,
    fatLiquidoDia: number,
    vendasSemana: VendaDashboardDiasResponse[],
    precificacoesDia: VendaPrecificacaoDashboardResponse[],
    precificacoesSemana: VendaPrecificacaoDashboardResponse[]
}