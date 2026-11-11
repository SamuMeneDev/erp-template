import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useInsumoDelete } from "@erp-template/services";
import type { InsumoResponse } from "@erp-template/types/response/InsumoResponse";
import { BaseAlert } from "../_dialog";

type InsumoDeleteDialogProps = BaseDialogProps & {
    insumo: InsumoResponse;
}

/**
 * Componente para confirmação de exclusão
 */
export function InsumoDeleteDialog({ insumo, ...dialogProps }: InsumoDeleteDialogProps) {

    /**
     * Estados de requisição.
     */
    const { mutate, isPending, isSuccess, reset } = useInsumoDelete(insumo.id);

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Insumo excluido com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {insumo.nome}?</p>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={dialogProps.close}>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={()=>mutate()} disabled={isPending}>
                    {isPending && <Spinner />}
                    Excluir
                </AlertDialogAction>
            </AlertDialogFooter>
        </BaseAlert>
    )
}