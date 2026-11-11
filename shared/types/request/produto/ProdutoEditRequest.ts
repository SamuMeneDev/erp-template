export interface ProdutoEditRequest {
    nome: string;
    codigo?: string;
    descricao?: string;
    quantMinima?: number;
    quantAtual?: number;
    categoriaId?: number;
    urlFoto?: string;
    // status
    // componentes
}