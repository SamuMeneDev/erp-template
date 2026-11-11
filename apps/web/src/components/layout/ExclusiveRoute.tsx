import { temAcesso } from "@/utils/groupData";
import { useMe } from "@erp-template/services";
import type { UsuarioRoles } from "@erp-template/types";
import { Navigate, Outlet } from "react-router";

type ExclusiveRouteProps = {
    /**
     * Roles quem podem acessar essa página.
     */
    exclusive?: UsuarioRoles[];
}

/**
 * Componente que envelopa uma página, a fim de projete-la a nivel de acesso
 */
export function ExclusiveRoute({ exclusive }: ExclusiveRouteProps) {
    const {data} = useMe();
   
        return temAcesso(data?.data.role, exclusive) ? <Outlet /> : <Navigate to="/login" replace />;
}