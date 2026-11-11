import { useAuth } from "@erp-template/contexts"
import { Navigate, Outlet } from "react-router"

export function PublicRoute() {
    
    const { isAuth } = useAuth()
    if(isAuth) {
        return <Navigate to="/dashboard" replace />
    }
    return <Outlet />
}