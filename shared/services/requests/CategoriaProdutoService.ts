import type { CategoriaProdutoCreateRequest, PagedResponse, CategoriaProdutoEditRequest, CategoriaProdutoResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategoriaProdutoFindAll(params?: URLSearchParams) {
    const queryString = params?.toString() ?? "";
    return useQuery({
        queryKey: [...keys.CATEGORIA_PRODUTO_FINDALL, queryString],
        queryFn: () => CategoriaProdutoService.findAll(params)
    });
}

export function useCategoriaProdutoCreate() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: CategoriaProdutoCreateRequest) => CategoriaProdutoService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_PRODUTO_FINDALL});
        }
    });
}

export function useCategoriaProdutoEdit(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: CategoriaProdutoEditRequest) => CategoriaProdutoService.edit(id, request),
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_PRODUTO_FINDALL});
        }
    });
}

export function useCategoriaProdutoDelete(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => CategoriaProdutoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_PRODUTO_FINDALL});
        }
    });
}

class CategoriaProdutoService {

    static async findAll(params?: URLSearchParams) {
        const response = await api.get<PagedResponse<CategoriaProdutoResponse>>("/produto/categoria/findAll", { params });
        return response;
    }

    static async create(request: CategoriaProdutoCreateRequest) {
        const response = await api.post("/produto/categoria/create", request);
        return response;
    }

    static async edit(id: number, request: CategoriaProdutoEditRequest) {
        const response = await api.patch(`/produto/categoria/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/produto/categoria/${id}`);
        return response;
    }
}