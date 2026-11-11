export interface ProdutoCreateRequest {
    nome: string;
    codigo: string;
    descricao?: string;
    quantMinima: number;
    quantAtual?: number;
    categoriaId?: number;
    urlFoto?: string;
}