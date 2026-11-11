import { keys } from "@erp-template/types";
import type {PagedResponse, VendaDashboardResponse, VendaCreateRequest, VendaResponse} from "@erp-template/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api";

export function useVendaCreate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request: VendaCreateRequest) => VendaService.create(request),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: keys.VENDA_DASHBOARD_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.VENDA_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL})
            queryClient.invalidateQueries({queryKey: keys.INSUMO_FINDALL})
        }
    })
}

export function useVendaFindAll(query?: URLSearchParams) {
    const queryString = query?.toString() ?? "";
    return useQuery({
        queryKey: [...keys.VENDA_FINDALL, queryString],
        queryFn: ()=>VendaService.findAll(query)
    })
}

export function useVendaDashboardFindAll(query?: URLSearchParams) {
    const queryString = query?.toString() ?? "";
    return useQuery({
        queryKey: [...keys.VENDA_DASHBOARD_FINDALL, queryString],
        queryFn: ()=>VendaService.dashboard(query)
    })
}

export function useVendaDelete(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=> VendaService.delete(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: keys.VENDA_DASHBOARD_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.VENDA_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.PRODUTO_FINDALL})
            queryClient.invalidateQueries({queryKey: keys.INSUMO_FINDALL})
        }
    })
}

export function useVendaCancelar(id: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ()=> VendaService.cancelar(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: keys.VENDA_DASHBOARD_FINDALL});
            queryClient.invalidateQueries({queryKey: keys.VENDA_FINDALL});
        }
    })
}

class VendaService {
    static async create(request: VendaCreateRequest) {
        const response = await api.post("/venda", request);
        return response;
    }

    static async findAll(params?: URLSearchParams) {
        const response = await api.get<PagedResponse<VendaResponse>>("/venda/findAll", {params});
        return response;
    }

    static async dashboard(params?: URLSearchParams) {
        const response = await api.get<VendaDashboardResponse>("/venda/dashboard", {params});
        return response;
    }
    static async delete(id: number) {
        const response = await api.delete(`/venda/${id}/delete`);
        return response;
    }
    static async cancelar(id: number) {
        const response = await api.patch(`/venda/${id}/cancelar`);
        return response;
    }
}