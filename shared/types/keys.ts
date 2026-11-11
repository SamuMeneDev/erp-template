/**
 * Query keys usadas para gerenciamento
 * do cache nas requisições, devem ser definidas aqui.
 */
export const keys = {
    ME: ["me"],
    INSUMO_FINDALL: ["insumoFindAll"],
    CATEGORIA_INSUMO_FINDALL: ["categoriaInsumoFindAll"],
    CATEGORIA_PRODUTO_FINDALL: ["categoriaProdutoFindAll"],
    PRODUTO_FINDALL: ["produtoFindAll"],
    PRECIFICACAO_FINDALL: ["precificacaoFindAll"],
    PRECIFICACAO_VALORES: ["precificacaoValores"],
    DESCONTO_GLOBAL: ["descontoGlobal"],
    DESCONTO_PRODUTO_FINDALL: ["descontoProdutoFindAll"],
    USUARIO_FINDALL: ["usuarioFindAll"],
    VENDA_FINDALL: ["vendaFindAll"],
    VENDA_DASHBOARD_FINDALL: ["vendaDashboardFindAll"],
    CHAMADO_FINDALL: ["chamadoFindAll"],
    CATEGORIA_CHAMADO_FINDALL: ["categoriaChamadoFindAll"],
    MENSAGEM_CHAMADO_FINDALL: ["mensagemChamadoFindAll"],
    ADMIN_CHAMADO_FINDALL: ["adminChamadoFindAll"]
}


// Forma para keys da precificação, onde id é o id do produto e key é a key PRECIFICACAO_VALORES
export type composedKeys = [id: number, key: string[]];
export type keyParams = [key: string[], paramsString: string];