import type { BaseDialogProps } from "@/types";
import { BaseDialog } from "../_dialog";
import { useCategoriaChamadoEdit } from "@erp-template/services";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoriaChamadoEditSchema } from "@erp-template/schemas";
import { Button, DialogFooter, Field, FieldError, FieldLabel, Input } from "@/components/ui";
import type z from "zod";
import { useToast } from "@/hooks";
import type { CategoriaChamadoResponse } from "@erp-template/types";

type CategoriaChamadoEditDialogProps = BaseDialogProps & {
    categoria: CategoriaChamadoResponse
}

export function CategoriaChamadoEditDialog({categoria, ...dialogProps}: CategoriaChamadoEditDialogProps) {

    const { mutate, isPending, isSuccess } = useCategoriaChamadoEdit(categoria.id);

    const {handleSubmit, register, formState: { errors, isValid, isDirty }} = useForm({
        resolver: zodResolver(categoriaChamadoEditSchema),
        defaultValues: {
            nome: categoria.nome,
            urgencia: categoria.urgencia
        }
    })

    function submit(data: z.infer<typeof categoriaChamadoEditSchema>) {
        mutate(data);
    }

    useToast({
        isSuccess,
        config: {title: "Categoria editada com sucesso!", type: "success", timeout: 3000},
        before: ()=>{dialogProps.close();}
    })
    return (
        <BaseDialog title="Editar categoria" {...dialogProps}>
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
                    <Button disabled={isPending || !isValid || !isDirty} type="submit">Salvar</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}