import { useAuth } from "@erp-template/contexts"
import { Navigate, Outlet } from "react-router";
import { DelayedLoading } from "../common";
import { UsuarioAlteracaoSenhaDialog } from "../common/admin/UsuarioAlteracaoSenhaDialog";


/**
 * Componente que protege a exibição de rotas da aplicação.
 */
export function PrivateRoute() {
    const {isAuth, isLoading, usuario} = useAuth();
    if(isLoading) {
        return (
            <DelayedLoading isPending={isLoading} /> 
        )
    } else if(usuario && usuario.mudarSenha) {
        return <UsuarioAlteracaoSenhaDialog isOpen={usuario.mudarSenha} open={()=>{}} close={()=>{}} />
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}