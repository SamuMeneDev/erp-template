export interface InsumoCreateRequest {
    nome: string;
    preco: number;
    categoriaId?: number,
    urlFoto?: string,
    quantAtual: number
}