import { Button } from "@/components/ui";
import { AdminAlterarSenhaDialog } from "../../admin/AdminAlterarSenhaDialog";
import { useAuth } from "@erp-template/contexts";
import { useDialog } from "@/hooks";
export function RedefinirSenha() {

    const dialog = useDialog();
    const { usuario } = useAuth();

    return (
        <>
            <div className="mt-10 max-w-20">
                <Button onClick={dialog.open}>Redefinir senha</Button>
            </div>
            {usuario && dialog.isOpen && (
                <AdminAlterarSenhaDialog usuario={usuario} {...dialog}/>
            )}
        </>
    )
}