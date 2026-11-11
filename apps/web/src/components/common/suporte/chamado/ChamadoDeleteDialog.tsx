import type { BaseDialogProps } from "@/types"
import type { ChamadoResponse } from "@erp-template/types"
import { BaseAlert } from "../../_dialog"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle } from "@/components/ui"
import { useChamadoDelete } from "@erp-template/services"
import { useToast } from "@/hooks"

type ChamadoDeleteDialogProps = BaseDialogProps & {
    chamado: ChamadoResponse
}

export function ChamadoDeleteDialog({ chamado, ...dialogProps }: ChamadoDeleteDialogProps) {
    
    const { mutate, isPending, isSuccess } = useChamadoDelete(chamado.id);

    useToast({
        config: { timeout: 3000, title: "Chamado excluido com sucesso!", type: "success" },
        isSuccess,
        before: ()=>{ dialogProps.close(); }
    })

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Deseja mesmo excluir esse chamado?</AlertDialogTitle>
            <span className="text-sm">{chamado.titulo}</span>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogProps.close} variant="outline">
                    Cancelar
                </AlertDialogCancel>
                <AlertDialogAction disabled={isPending} onClick={()=>mutate()}>
                    Excluir chamado
                </AlertDialogAction>
            </AlertDialogFooter>
        </BaseAlert>
    )
}