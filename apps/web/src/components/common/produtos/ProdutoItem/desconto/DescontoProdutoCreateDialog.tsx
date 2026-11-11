import { BaseDialog } from "@/components/common/_dialog";
import { Button, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { descontoProdutoCreateSchema } from "@erp-template/schemas";
import { useDescontoProdutoCreate } from "@erp-template/services";
import type { DescontoProdutoCreateRequest, ProdutoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

type DescontoProdutoCreateDialogProps = BaseDialogProps & {
    produto: ProdutoResponse
}

export function DescontoProdutoCreateDialog({ produto, ...dialogProps }: DescontoProdutoCreateDialogProps) {

    /**
     * Estados do formulário
     */
    const { control, handleSubmit, register, reset, formState: {errors, defaultValues, isValid} } = useForm({
        resolver: zodResolver(descontoProdutoCreateSchema),
        defaultValues: {tipoValor: "PORCENTAGEM"}
    });

    const { mutate, isPending, isSuccess } = useDescontoProdutoCreate();


    function submit(data: z.infer<typeof descontoProdutoCreateSchema>) {
        const request: DescontoProdutoCreateRequest = data;
        request.idProduto = produto.id;
        mutate(request);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Desconto adicionado ao produto!"}});

    return (
        <BaseDialog title={`Atribuir desconto à ${produto.nome}`} {...dialogProps}>
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
                            <Input type="text" placeholder="Ex.: 1" {...register("valor")}/>
                            {errors.valor && <FieldError>{errors.valor.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Tipo do desconto</FieldLabel>
                            <Controller
                                control={control}
                                name="tipoValor"
                                render={({ field }) => (
                                    <RadioGroup
                                    defaultValue={defaultValues?.tipoValor}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    >
                                        <div className="flex gap-2">
                                            <RadioGroupItem value="REAL" id="real" />
                                            <Label className="font-bold">R$</Label>
                                        </div>
                                        <div className="flex gap-2">
                                            <RadioGroupItem value="PORCENTAGEM" id="porc" />
                                            <Label className="font-bold">%</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            
                            />
                            {errors.tipoValor && <FieldError>{errors.tipoValor.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <Button onClick={dialogProps.close} variant="outline">Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid} >
                        Adicionar desconto
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}