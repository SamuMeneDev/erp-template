import type { ProdutoResponse } from "./ProdutoResponse";

export interface SelecaoVendaResponse {
    id: number,
    quantidade: number,
    produto: ProdutoResponse
}