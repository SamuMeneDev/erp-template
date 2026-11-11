import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { categoriaProdutoEditSchema } from "@erp-template/schemas";
import { useCategoriaProdutoEdit } from "@erp-template/services";
import type { CategoriaProdutoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../../_dialog";

type CategoriaProdutoEditDialogProps =  BaseDialogProps & {
    categoria: CategoriaProdutoResponse;
}

/**
 * Dialog com o formulário de editar categoria.
 */
export function CategoriaProdutoEditDialog({ categoria, ...dialogProps }: CategoriaProdutoEditDialogProps) {

    /**
     * Estado de formulário
     */
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid }} = useForm({
        resolver: zodResolver(categoriaProdutoEditSchema),
        mode: "onTouched",
        defaultValues: {
            nome: categoria.nome
        }
    });

    /**
     * Estados de requisição
     */
    const { mutate, isPending, isSuccess } = useCategoriaProdutoEdit(categoria.id);

    function submit(data: z.infer<typeof categoriaProdutoEditSchema>) {
        mutate(data);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Categoria editada com sucesso!"}});

    return (
        <BaseDialog title={`Editar ${categoria.nome}`} {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome da categoria</FieldLabel>
                        <Input placeholder="Categoria" aria-invalid={!!errors.nome} {...register("nome")}/>
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button disabled={isPending || !isValid || !isDirty} type="submit">
                        {isPending && <Spinner />}
                        <span>Salvar</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}