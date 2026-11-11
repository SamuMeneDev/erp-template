import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, Spinner } from "@/components/ui";
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { produtoCreateSchema } from "@erp-template/schemas";
import { useCategoriaProdutoFindAll, useProdutoCreate } from "@erp-template/services";
import type { CategoriaProdutoResponse } from "@erp-template/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BaseDialog } from "../_dialog";

type ProdutoCreateDialogProps = BaseDialogProps & {    
}

/**
 * Formulário de cadastro de um novo produto.
 */
export function ProdutoCreateDialog(dialogProps: ProdutoCreateDialogProps) {
    /**
     * Estados do formulário
     */
    const { register, watch, setValue, handleSubmit, reset, formState: {errors, isValid} } = useForm({
        resolver: zodResolver(produtoCreateSchema), 
        mode: "onTouched",
        defaultValues: {markup: 1}
    })

    /**
     * Estados da requisição
     */
    const { mutate, isSuccess, isPending } = useProdutoCreate();

    const [_, debouce, update, isDebouncing] = useDebouncer("", 2000)

    /**
     * Dados das categorias em cache.
     */
    const { data: dataCategoria } = useCategoriaProdutoFindAll(new URLSearchParams(`nome=${debouce}`));

    const listaCategorias: CategoriaProdutoResponse[] = dataCategoria?.data.content || [];

    function submit(data: z.infer<typeof produtoCreateSchema>) {
        mutate(data);
    }

    /**
     * Feedback caso requisição bem sucedida.
     */
    useToast({before:()=>{
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Produto cadastrado com sucesso!"}})

    return (
        <BaseDialog title="Cadastrar Produto" {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome do produto</FieldLabel>
                        <Input placeholder="Ex.: Novo produto A" aria-invalid={!!errors.nome} {...register("nome")}/>
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Descrição do produto</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea className="max-h-28 lg:max-h-50" placeholder="Ex.: Informações do produto" {...register("descricao")}/>
                            <InputGroupAddon align="block-end">
                                <InputGroupText className={`${errors.descricao && "text-red-400"}`}>{watch("descricao")?.trim().length ?? 0}/500</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                        {errors.descricao && <FieldError>{errors.descricao.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Imagem do produto</FieldLabel>
                        <Input type="url" placeholder="Url da imagem" {...register("urlFoto")}/>
                    </Field>
                    <div className="flex justify-between gap-3">
                        <Field>
                            <FieldLabel>Código</FieldLabel>
                            <Input placeholder="Codigo interno do produto" {...register("codigo")} aria-invalid={!!errors.codigo}/>
                            {errors.codigo && <FieldError>{errors.codigo.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Markup inicial</FieldLabel>
                            <Input min={1} placeholder="Valor de markup" {...register("markup")} aria-invalid={!!errors.markup}/>
                            {errors.markup && <FieldError>{errors.markup.message}</FieldError>}
                        </Field>
                    </div>
                    <Field aria-invalid={!!errors.categoriaId}>
                        <FieldLabel>Categoria do produto</FieldLabel>
                        <Combobox items={listaCategorias} onValueChange={(c) => setValue("categoriaId", c?.id, { shouldValidate: true, shouldDirty: true })} itemToStringLabel={(i:CategoriaProdutoResponse)=>i.nome}>
                            <ComboboxInput aria-invalid={!!errors.categoriaId} onChange={(e)=>update(e.target.value)} onClear={()=>update("")} showClear placeholder="Buscar categoria" />
                            <ComboboxContent>
                                {(isPending || isDebouncing) && (
                                    <div className="flex justify-center">
                                        <Spinner />
                                    </div>
                                )}
                                <ComboboxList>
                                    {listaCategorias.map(c=>(
                                        <ComboboxItem key={c.id} value={c}>
                                            {c.nome}
                                        </ComboboxItem>
                                    ))}
                                </ComboboxList>
                                {listaCategorias.length < 1 && (
                                    <ComboboxEmpty>
                                        Nenhuma categoria encontrada
                                    </ComboboxEmpty>
                                )}
                            </ComboboxContent>
                        </Combobox>
                    </Field>
                    <div className="flex justify-between gap-5">
                        <Field>
                            <FieldLabel>Quant. Atual</FieldLabel>
                            <Input type="number" min="0" placeholder="Ex.: 5" aria-invalid={!!errors.quantAtual} {...register("quantAtual")}/>
                            {errors.quantAtual && <FieldError>{errors.quantAtual.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Quant. Mínima</FieldLabel>
                            <Input type="number" min="1" placeholder="Ex.: 3" aria-invalid={!!errors.quantAtual} {...register("quantMinima")}/>
                            {errors.quantMinima && <FieldError>{errors.quantMinima.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>
                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close}>Cancelar</Button>
                    <Button disabled={isPending || !isValid} type="submit">
                        {isPending && <Spinner />}
                        <span>Cadastrar Produto</span>
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>

    )
}