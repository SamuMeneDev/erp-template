import type { ComponenteCreateRequest, ComponenteEditRequest } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useComponenteCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ComponenteCreateRequest) => ComponenteService.create(request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES})
        }
    });
}

export function useComponenteEdit(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ComponenteEditRequest) => ComponenteService.edit(id, request),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES})
        }
    });
}

export function useComponenteDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => ComponenteService.delete(id),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRECIFICACAO_VALORES})
        },
    });
}

class ComponenteService {
    static async create(request: ComponenteCreateRequest) {
        const response = await api.post("/produto/componente/create", request);
        return response;
    }

    static async edit(id: number, request: ComponenteEditRequest) {
        const response = await api.patch(`/produto/componente/${id}`, request);
        return response;
    }

    static async delete(id: number) {
        const response = await api.delete(`/produto/componente/${id}`);
        return response;
    }
}