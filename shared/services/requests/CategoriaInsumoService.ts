import type { CategoriaInsumoCreateRequest, CategoriaInsumoEditRequest, CategoriaInsumoResponse, PagedResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategoriaInsumoFindAll(params?: URLSearchParams) {
    const queryString = params?.toString() ?? "";
    return useQuery({
        queryKey: [...keys.CATEGORIA_INSUMO_FINDALL, queryString],
        queryFn: () => CategoriaInsumoService.findAll(params)
    });
}

export function useCategoriaInsumoCreate() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: CategoriaInsumoCreateRequest) => CategoriaInsumoService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_INSUMO_FINDALL});
        }
    });
}

export function useCategoriaInsumoEdit(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: CategoriaInsumoEditRequest) => CategoriaInsumoService.edit(id, request),
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_INSUMO_FINDALL});
        }
    });
}

export function useCategoriaInsumoDelete(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => CategoriaInsumoService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_INSUMO_FINDALL});
        }
    });
}

class CategoriaInsumoService {

    static async findAll(params?: URLSearchParams) {
        const response = await api.get<PagedResponse<CategoriaInsumoResponse>>("/insumo/categoria/findAll", { params });
        return response;
    }

    static async create(request: CategoriaInsumoCreateRequest) {
        const response = await api.post("/insumo/categoria/create", request);
        return response;
    }

    static async edit(id: number, request: CategoriaInsumoEditRequest) {
        const response = await api.patch(`/insumo/categoria/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/insumo/categoria/${id}`);
        return response;
    }
}