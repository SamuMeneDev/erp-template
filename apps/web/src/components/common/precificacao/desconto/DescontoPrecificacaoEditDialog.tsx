import { Button, Dialog, DialogContent, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, NativeSelect, NativeSelectOption, Spinner } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { descontoPrecificacaoEditSchema } from "@erp-template/schemas";
import { useDescontoPrecEdit } from "@erp-template/services";
import type { DescontoPrecificacaoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

type DescontoPrecificacaoEditDialogProps = BaseDialogProps & {
    desconto: DescontoPrecificacaoResponse
}
export function DescontoPrecificacaoEditDialog({isOpen, close, desconto}: DescontoPrecificacaoEditDialogProps) {

    const { handleSubmit, reset, register, formState: {errors, isValid, isDirty}} =
    useForm({
        resolver: zodResolver(descontoPrecificacaoEditSchema),
        defaultValues: {
            nome: desconto.nome,
            tipoValor: desconto.tipoValor,
            valor: desconto.valor
        },
        mode: "onTouched"
    });
    const { mutate, isPending, isSuccess } = useDescontoPrecEdit(desconto.id);

    function submit(data: z.infer<typeof descontoPrecificacaoEditSchema>) {
        mutate(data);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        reset();
        close();
    }, isSuccess, config: {title: "Desconto alterado com sucesso!"}});

    return (
        <Dialog open={isOpen}>
            <DialogContent showCloseButton={false}>
                <h1 className="text-xl font-medium">Editar desconto</h1>
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
                                <Input type="number" min="" placeholder="Ex.: 1" {...register("valor")}/>
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
                        <Button onClick={close} type="button" variant="outline">Cancelar</Button>
                        <Button type="submit" disabled={isPending || !isValid || !isDirty} >
                            {isPending && <Spinner />}
                            Salvar alterações
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}