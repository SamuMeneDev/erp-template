import { BaseAlert } from "@/components/common/_dialog";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useDescontoProdutoDelete } from "@erp-template/services";
import type { DescontoProdutoResponse } from "@erp-template/types";

type DescontoProdutoDeleteDialogProps = BaseDialogProps & {
    desconto: DescontoProdutoResponse
}

/**
 * Dialog de confirmação de exclusão de descontos.
 */
export function DescontoProdutoDeleteDialog({ desconto, ...dialogProps }: DescontoProdutoDeleteDialogProps) {

        /**
         * Estados de requisição.
         */
        const { mutate, isPending, isSuccess, reset } = useDescontoProdutoDelete(desconto.id);
    
        /**
         * Feedback para o usuário após requisição.
         */
        useToast({before: ()=> {
            dialogProps.close();
            reset();
        }, isSuccess, config: {title: "Desconto excluido com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {desconto.nome}?</p>
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