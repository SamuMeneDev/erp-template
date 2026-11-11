import type { BaseDialogProps } from "@/types";
import { BaseAlert } from "../_dialog";
import type { VendaResponse } from "@erp-template/types";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useVendaDelete } from "@erp-template/services";
import { useToast } from "@/hooks";

type VendaDeleteDialogProps = BaseDialogProps & {
    venda: VendaResponse
}

export function VendaDeleteDialog({venda, ...dialogProps}: VendaDeleteDialogProps) {

    const { mutate, isPending, isSuccess } = useVendaDelete(venda.id);

    useToast({
        config:{
            timeout: 5000,
            title: "Venda excluida com sucesso!",
            type: "success"
        },
        before: ()=> { dialogProps.close(); },
        isSuccess
    })

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Deseja mesmo excluir essa venda?</AlertDialogTitle>
            <AlertDialogDescription className="text-secondary-foreground">
                Ao excluir, as quantidades debitadas de produtos e insumos serão revertidas.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogProps.close}>Cancelar</AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={()=>mutate()}>
                    {isPending && <Spinner />}
                    Excluir venda
                </AlertDialogAction>
            </AlertDialogFooter>
        </BaseAlert>
    )
}