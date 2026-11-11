import type { ChamadoCreateRequest, ChamadoEditRequest, ChamadoResponse } from "@erp-template/types";
import { keys } from "@erp-template/types";
import { api } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChamadoCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ChamadoCreateRequest)=>ChamadoService.create(request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}
export function useChamadoFindAll(params?: URLSearchParams) {
    const queryString = params?.toString() ?? "";
    return useQuery({
        queryFn: ()=> ChamadoService.findAll(params),
        queryKey: [...keys.CHAMADO_FINDALL, queryString]
    });
}

export function useChamadoEdit(idChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: ChamadoEditRequest)=>ChamadoService.edit(idChamado, request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}
export function useChamadoDelete(idChamado: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=>ChamadoService.delete(idChamado),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.CHAMADO_FINDALL});
        }
    });
}

class ChamadoService {
    static async create(request: ChamadoCreateRequest) {
        const response = await api.post("/chamado/create", request);
        return response;
    }
    static async findAll(params?: URLSearchParams) {
        const response = await api.get<ChamadoResponse[]>("/chamado/findAll", {params});
        return response;
    }
    static async edit(idChamado: number, request: ChamadoEditRequest) {
        const response = await api.patch(`/chamado/edit/${idChamado}`, request);
        return response;
    }
    static async delete(idChamado: number) {
        const response = await api.delete(`/chamado/delete/${idChamado}`);
        return response;
    }
}