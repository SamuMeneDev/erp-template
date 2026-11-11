import type { BaseDialogProps } from "@/types";
import type { VendaResponse } from "@erp-template/types";
import { BaseAlert } from "../_dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useVendaCancelar } from "@erp-template/services";
import { useToast } from "@/hooks";

type VendaCancelDialogProps = BaseDialogProps & {
    venda: VendaResponse
}

export function VendaCancelDialog({venda, ...dialogProps}: VendaCancelDialogProps) {

    const { mutate, isPending, isSuccess } = useVendaCancelar(venda.id);

    useToast({
        config: {
            timeout: 5000,
            title: "Venda cancelada com sucesso!",
            type: "success",
        },
        before: ()=> { dialogProps.close(); },
        isSuccess
    })

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>{venda.status == "CANCELADA" ? "Descancelar venda" : "Cancelar Venda"}?</AlertDialogTitle>
                <AlertDialogDescription className="text-secondary-foreground">
                    {venda.status != "CANCELADA" ? 
                    "Cancele a venda em casos que a venda não foi finalizada com" + 
                    "exito Ex: Furto da venda, Venda cancelada com reembolso do cliente etc... "
                    : "Deseja descancelar essa venda?"
                    }
                    </AlertDialogDescription>

            <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogProps.close}>Fechar</AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={()=>mutate()}>
                    {isPending && <Spinner />}
                    {venda.status == "CANCELADA" ? "Descancelar venda" : "Cancelar Venda"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </BaseAlert>
    )
}