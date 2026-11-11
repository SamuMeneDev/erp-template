import type { PagedResponse, ProdutoCreateRequest, ProdutoEditRequest, ProdutoResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useProdutoFindAll(params?: URLSearchParams) {
    const queryString = params?.toString() ?? "";
   return useQuery({
    queryKey: [...keys.PRODUTO_FINDALL, queryString],
    queryFn: () => ProdutoService.findAll(params)
   });
}

export function useProdutoCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ProdutoCreateRequest) => ProdutoService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
        }
    });
}

export function useProdutoEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ProdutoEditRequest) => ProdutoService.edit(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
            queryClient.invalidateQueries({queryKey: keys.VENDA_FINDALL});
        }
    });
}

export function useProdutoDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => ProdutoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
        }
    });
}

class ProdutoService {
    static async findAll(params?: URLSearchParams) {
        const response = await api.get<PagedResponse<ProdutoResponse>>("/produto/findAll", { params });
        return response
    }

    static async create(request: ProdutoCreateRequest) {
        const response = await api.post("/produto/create", request);
        return response;
    }

    static async edit(id: number, request: ProdutoEditRequest) {
        const response = await api.patch(`/produto/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/produto/${id}`);
        return response;
    }
}