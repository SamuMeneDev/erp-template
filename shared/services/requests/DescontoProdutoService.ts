import type { DescontoProdutoCreateRequest, DescontoProdutoEditRequest, DescontoProdutoResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDescontoProdutoCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: DescontoProdutoCreateRequest) => DescontoProdutoService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.DESCONTO_PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

export function useDescontoProdutoFindAll(idProduto: number) {
    return useQuery({
        queryKey: keys.DESCONTO_PRODUTO_FINDALL,
        queryFn: () => DescontoProdutoService.findAll(idProduto)
    });
}

export function useDescontoProdutoEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: DescontoProdutoEditRequest) => DescontoProdutoService.edit(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.DESCONTO_PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

export function useDescontoProdutoDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => DescontoProdutoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.DESCONTO_PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

class DescontoProdutoService {
    static async create(request: DescontoProdutoCreateRequest) {
        const response = await api.post("/desconto-produto/create", request);
        return response;
    }

    static async edit(id: number, request: DescontoProdutoEditRequest) {
        const response = await api.patch(`/desconto-produto/${id}`, request);
        return response;
    }
    static async delete(id: number) {
        const response = await api.delete(`/desconto-produto/${id}`);
        return response;
    }
    static async findAll(id: number) {
        const response = await api.get<DescontoProdutoResponse[]>(`/desconto-produto/${id}/findAll`);
        return response;
    }

}