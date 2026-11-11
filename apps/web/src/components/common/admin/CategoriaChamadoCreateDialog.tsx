import type { BaseDialogProps } from "@/types";
import { BaseDialog } from "../_dialog";
import { useCategoriaChamadoCreate } from "@erp-template/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriaChamadoCreateSchema } from "@erp-template/schemas";
import { Button, DialogFooter, Field, FieldError, FieldLabel, Input } from "@/components/ui";
import type z from "zod";
import { useToast } from "@/hooks";

type CategoriaChamadoCreateDialogProps = BaseDialogProps & {

}

export function CategoriaChamadoCreateDialog(dialogProps: CategoriaChamadoCreateDialogProps) {

    const { mutate, isPending, isSuccess } = useCategoriaChamadoCreate();

    const {handleSubmit, register, formState: { errors, isValid }} = useForm({resolver: zodResolver(categoriaChamadoCreateSchema)})

    function submit(data: z.infer<typeof categoriaChamadoCreateSchema>) {
        mutate(data);
    }

    useToast({
        isSuccess,
        config: {title: "Categoria criada com sucesso!", type: "success", timeout: 3000},
        before: ()=>{dialogProps.close();}
    })
    return (
        <BaseDialog title="Criar categoria" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <Field>
                    <FieldLabel>Nome da categoria</FieldLabel>
                    <Input placeholder="Ex.: Ajuda com o sistema" {...register("nome")}/>
                    {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                </Field>
                <Field>
                    <FieldLabel>Urgência da categoria</FieldLabel>
                    <Input type="number" min={0} placeholder="1" {...register("urgencia", {valueAsNumber:true})}/>
                    {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                </Field>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close}>Cancelar</Button>
                    <Button disabled={isPending || !isValid} type="submit">Criar categoria</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}