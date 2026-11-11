import type { InsumoCreateRequest, InsumoEditRequest, InsumoResponse, PagedResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export function useInsumoCreate() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: InsumoCreateRequest) => InsumoService.create(data),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: keys.INSUMO_FINDALL})
        }
    });
}

export function useInsumoFindAll(query?: URLSearchParams) {
    const queryString = query?.toString() ?? "";
    return useQuery({
        queryFn: ()=>InsumoService.findAll(query),
        queryKey: [...keys.INSUMO_FINDALL, queryString],
        placeholderData: (prev) => prev,
    });
}

export function useInsumoEdit(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (request: InsumoEditRequest) => InsumoService.edit(id, request),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: keys.INSUMO_FINDALL})
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES});
        }
    });
}

export function useInsumoDelete(id: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: () => InsumoService.delete(id),
        onSuccess:()=> {
            queryClient.invalidateQueries({queryKey: keys.INSUMO_FINDALL})
        }
    });
}


class InsumoService {
    static async create(request: InsumoCreateRequest) {
        const response = await api.post("/insumo/create", request);
        return response;
    }

    static async findAll(params?: URLSearchParams) {
        const response = await api.get<PagedResponse<InsumoResponse>>("/insumo/findAll", { params });
        return response;
    }

    static async edit(id: number, request: InsumoEditRequest) {
        const response = await api.patch(`/insumo/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/insumo/${id}`);
        return response;
    }
}