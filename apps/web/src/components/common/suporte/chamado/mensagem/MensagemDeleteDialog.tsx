import type { BaseDialogProps } from "@/types";
import type { MensagemChamadoResponse } from "@erp-template/types";
import { BaseAlert } from "../../../_dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle } from "@/components/ui";
import { MensagemItem } from "./MensagemItem";
import { useMensagemChamadoDelete } from "@erp-template/services";
import { useToast } from "@/hooks";

type MensagemDeleteDialogProps = BaseDialogProps & {
    mensagem: MensagemChamadoResponse
}

export function MensagemDeleteDialog({mensagem, ...dialogProps}: MensagemDeleteDialogProps) {

    const { mutate, isPending, isSuccess } = useMensagemChamadoDelete(mensagem.id);

    useToast({
        config: { title: "Mensagem excluida com sucesso", timeout: 3000, type: "success" },
        before: ()=> { dialogProps.close(); },
        isSuccess
    })

    return (
        <BaseAlert {...dialogProps}>
                <AlertDialogTitle>Deseja mesmo excluir essa mensagem?</AlertDialogTitle>
                <div className="flex flex-col gap-3 items-center p-2">
                    <MensagemItem showMenu={false} mensagem={mensagem} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={dialogProps.close} >Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>mutate()} disabled={isPending}>Excluir</AlertDialogAction>
                </AlertDialogFooter>
        </BaseAlert>
    )
}