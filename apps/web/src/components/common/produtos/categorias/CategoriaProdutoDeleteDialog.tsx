import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogTitle, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { useCategoriaProdutoDelete } from "@erp-template/services";
import type { CategoriaProdutoResponse } from "@erp-template/types";
import { BaseAlert } from "../../_dialog";

type CategoriaProdutoDeleteDialogProps = BaseDialogProps & {
    categoria: CategoriaProdutoResponse;
}

/**
 * Componente de dialog para confirmar exclusão de uma categoria.
 */
export function CategoriaProdutoDeleteDialog({ categoria, ...dialogProps }: CategoriaProdutoDeleteDialogProps) {

    /**
     * Estados de requisição.
     */
    const { mutate, isPending, isSuccess, reset } = useCategoriaProdutoDelete(categoria.id);

    // Feedback para o usuário após requisição.
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Categoria excluida com sucesso!"}});

    return (
        <BaseAlert {...dialogProps}>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <p>Deseja mesmo excluir {categoria.nome}?</p>
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