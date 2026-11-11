import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { categoriaInsumoCreateSchema } from "@erp-template/schemas";
import { useCategoriaInsumoCreate } from "@erp-template/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../../_dialog";


type CategoriaInsumoCreateDialogProps = BaseDialogProps & {
}
/**
 * Dialog com o formulário de criar categoria.
 */
export function CategoriaInsumoCreateDialog(dialogProps: CategoriaInsumoCreateDialogProps) {

    // Estado de formulário
    const { register, handleSubmit, reset, formState: { errors, isValid }} = useForm({resolver: zodResolver(categoriaInsumoCreateSchema), mode: "onTouched"});

    // Estados de requisição
    const { mutate, isPending, isSuccess } = useCategoriaInsumoCreate();

    function submit(data: z.infer<typeof categoriaInsumoCreateSchema>) {
        mutate(data);
    }

    // Feedback para o usuário após requisição.
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Categoria criada com sucesso!"}});

    return (
        <BaseDialog title="Criar Categoria de insumo" {...dialogProps}>
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
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending && <Spinner />}
                        <span>Criar categoria</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}