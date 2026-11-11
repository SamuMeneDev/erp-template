export interface SelecaoVenda {
    produtoId: number,
    quantidade: number
}

export interface VendaCreateRequest {
    precificacaoId: number,
    selecoesVenda: SelecaoVenda[]
}