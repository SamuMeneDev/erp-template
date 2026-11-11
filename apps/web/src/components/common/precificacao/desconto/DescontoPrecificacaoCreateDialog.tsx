import { Button, Dialog, DialogContent, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
import { useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { descontoPrecificacaoCreateSchema } from "@erp-template/schemas";
import { useDescontoPrecCreate } from "@erp-template/services";
import type { DescontoPrecificacaoCreateRequest, PrecificacaoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import type z from "zod";

type DescontoPrecificacaoCreateDialogProps = BaseDialogProps & {
    precificacao?: PrecificacaoResponse
}

export function DescontoPrecificacaoCreateDialog({ isOpen, close, precificacao }: DescontoPrecificacaoCreateDialogProps) {

    /**
     * Estados do formulário
     */
    const { control, handleSubmit, register, reset, formState: {errors, defaultValues, isValid} } = useForm({
        resolver: zodResolver(descontoPrecificacaoCreateSchema),
        defaultValues: {tipoValor: "PORCENTAGEM"}
    });

    const { mutate, isPending, isSuccess } = useDescontoPrecCreate();


    function submit(data: z.infer<typeof descontoPrecificacaoCreateSchema>) {
        const request: DescontoPrecificacaoCreateRequest = data;
        request.idPrecificacao = precificacao ? precificacao.id : undefined;
        mutate(request);
    }

    /**
     * Feedback para o usuário após requisição.
     */
    useToast({before: ()=> {
        close();
        reset();
    }, isSuccess, config: {title: "Desconto adicionado à precificação!"}});

    return (
        <Dialog open={isOpen}>
            <DialogContent showCloseButton={false}>
                <h1 className="text-xl font-medium">Atribuir desconto {precificacao ? `à ${precificacao.nome}` : "Global"}</h1>
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
                        <Button onClick={close} variant="outline">Cancelar</Button>
                        <Button type="submit" disabled={isPending || !isValid} >
                            Adicionar desconto
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}