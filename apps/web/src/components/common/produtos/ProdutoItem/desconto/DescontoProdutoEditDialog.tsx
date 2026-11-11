import { BaseDialog } from "@/components/common/_dialog";
import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, NativeSelect, NativeSelectOption, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { descontoProdutoEditSchema } from "@erp-template/schemas";
import { useDescontoProdutoEdit } from "@erp-template/services";
import type { DescontoProdutoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

type DescontoProdutoEditDialogProps = BaseDialogProps & {
    desconto: DescontoProdutoResponse
}
export function DescontoProdutoEditDialog({ desconto, ...dialogProps}: DescontoProdutoEditDialogProps) {

    const { handleSubmit, reset, register, formState: {errors, isValid, isDirty}} =
    useForm({
        resolver: zodResolver(descontoProdutoEditSchema),
        defaultValues: {
            nome: desconto.nome,
            tipoValor: desconto.tipoValor,
            valor: desconto.valor
        },
        mode: "onTouched"
    });
    const { mutate, isPending, isSuccess } = useDescontoProdutoEdit(desconto.id);

    function submit(data: z.infer<typeof descontoProdutoEditSchema>) {
        mutate(data);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        reset();
        dialogProps.close();
    }, isSuccess, config: {title: "Desconto alterado com sucesso!"}});

    return (
        <BaseDialog title="Editar Desconto" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup className="pb-3">
                    <Field>
                        <FieldLabel>Nome do desconto</FieldLabel>
                        <Input placeholder="Nome do desconto" aria-invalid={!!errors.nome} {...register("nome")} />
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>

                    <div className="flex justify-between gap-3">
                        <Field>
                            <FieldLabel>Valor do desconto</FieldLabel>
                            <Input type="number" min="1" placeholder="Ex.: 1" {...register("valor")}/>
                            {errors.valor && <FieldError>{errors.valor.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Tipo do desconto</FieldLabel>
                            <NativeSelect {...register("tipoValor")}>
                                <NativeSelectOption value="REAL" className="font-bold">
                                    R$
                                </NativeSelectOption>
                                <NativeSelectOption value="PORCENTAGEM" className="font-bold">
                                    %
                                </NativeSelectOption>
                            </NativeSelect>
                            {errors.tipoValor && <FieldError>{errors.tipoValor.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <Button onClick={dialogProps.close} type="button" variant="outline">Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid || !isDirty} >
                        {isPending && <Spinner />}
                        Salvar alterações
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}