import type { StatusVenda } from "../enumeration/StatusVenda"
import type { PrecificacaoResponse } from "./PrecificacaoResponse"
import type { SelecaoVendaResponse } from "./SelecaoVendaResponse"

export interface VendaResponse {
    id: number,
    status: StatusVenda,
    valorVendaTotal: number,
    faturamentoLiquido: number,
    lucroLiquido: number,
    selecoesVenda: SelecaoVendaResponse[],
    precificacao: PrecificacaoResponse,
    dataCriacao: string
}