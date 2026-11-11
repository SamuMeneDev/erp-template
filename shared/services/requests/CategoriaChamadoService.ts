import type { CategoriaChamadoCreateRequest, CategoriaChamadoResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategoriaChamadoFindAll(params?: URLSearchParams) {
    const queryString = params?.toString() ?? "";
    return useQuery({
        queryFn: ()=>CategoriaChamadoService.findAll(params),
        queryKey: [...keys.CATEGORIA_CHAMADO_FINDALL, queryString]
    });
}
export function useCategoriaChamadoCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: CategoriaChamadoCreateRequest)=>CategoriaChamadoService.create(request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_CHAMADO_FINDALL});
        }
    });
}
export function useCategoriaChamadoEdit(idCategoriaChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: CategoriaChamadoCreateRequest)=>CategoriaChamadoService.edit(idCategoriaChamado, request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_CHAMADO_FINDALL});
        }
    });
}
export function useCategoriaChamadoDelete(idCategoriaChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=>CategoriaChamadoService.delete(idCategoriaChamado),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CATEGORIA_CHAMADO_FINDALL});
        }
    });
}

class CategoriaChamadoService {
    static async findAll(params?: URLSearchParams) {
        const response = await api.get<CategoriaChamadoResponse[]>("/chamado/categoria/findAll", {params});
        return response;
    }
    static async create(request: CategoriaChamadoCreateRequest) {
        const response = await api.post("/chamado/categoria/create", request);
        return response;
    }
    static async edit(idCategoriaChamado: number, request: CategoriaChamadoCreateRequest) {
        const response = await api.patch(`/chamado/categoria/edit/${idCategoriaChamado}`, request);
        return response;
    }
    static async delete(idCategoriaChamado: number) {
        const response = await api.delete(`/chamado/categoria/delete/${idCategoriaChamado}`);
        return response;
    }
}