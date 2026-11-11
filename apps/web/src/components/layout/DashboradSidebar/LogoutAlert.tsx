import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { useAuth } from "@erp-template/contexts";
import type { ReactElement } from "react";

type LogoutAlertProps = AlertDialogPrimitive.Root.Props & {
    trigger: ReactElement;
}

export function LogoutAlert({trigger, ...props}: LogoutAlertProps) {
    const { logout } = useAuth();
    
    return (
        <AlertDialog {...props}>
            <AlertDialogTrigger render={trigger}>

            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Deseja mesmo sair?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={logout}>Sair</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}