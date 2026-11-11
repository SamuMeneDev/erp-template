import { Button, Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, DialogFooter, Field, FieldError, FieldGroup, FieldLabel, Input, InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, Spinner } from "@/components/ui"
import { useDebouncer, useToast } from "@/hooks";
import type { BaseDialogProps } from "@/types";
import { produtoEditSchema } from "@erp-template/schemas";
import { useCategoriaProdutoFindAll, useProdutoEdit } from "@erp-template/services";
import type { CategoriaProdutoResponse, ProdutoResponse } from "@erp-template/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { BaseDialog } from "../_dialog";

type ProdutoEditFormProps = BaseDialogProps & {
    produto: ProdutoResponse;
}

/**
 * Formulário de edição de um produto
 */
export function ProdutoEditDialog({ produto, ...dialogProps }: ProdutoEditFormProps) {
    

    // Estados do formulário
    const { handleSubmit, watch, setValue, register, reset, formState: {errors, isDirty, isValid} } = useForm({
        resolver: zodResolver(produtoEditSchema),
        mode: "onTouched",
        defaultValues: {
            codigo: produto.codigo ?? "",
            descricao: produto?.descricao ?? "",
            categoriaId: produto.categoria?.id ?? "",
            nome: produto.nome,
            quantAtual: produto.quantAtual,
            quantMinima: produto.quantMinima,
            markup: produto.markup,
            urlFoto: produto.urlFoto ?? ""
        }
    });

    const { mutate, isPending, isSuccess } = useProdutoEdit(produto.id);


    const [_, debouce, update, isDebouncing] = useDebouncer(produto.categoria?.nome || "", 2000)

    /**
     * Dados das categorias em cache.
     */
    const { data: dataCategoria } = useCategoriaProdutoFindAll(new URLSearchParams(`nome=${debouce}`));

    const listaCategorias: CategoriaProdutoResponse[] = dataCategoria?.data.content || [];

    function submit(request: z.infer<typeof produtoEditSchema>) {
        mutate(request);
    }

    useToast({before:()=>{
        dialogProps.close();
        reset();
    }, isSuccess, config: {title: "Produto editado com sucesso!"}})

    return (
        <BaseDialog title={`Editar ${produto.nome}`} {...dialogProps}>
            <form onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Nome do produto</FieldLabel>
                        <Input placeholder="Ex.: Produto A" aria-invalid={!!errors.nome} {...register("nome")}/>
                        {errors.nome && <FieldError>{errors.nome.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Descrição do produto</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea aria-invalid={!!errors.descricao} className="max-h-28 lg:max-h-50" placeholder="Ex.: Informações do produto" {...register("descricao")}/>
                            <InputGroupAddon align="block-end">
                                <InputGroupText className={`${errors.descricao && "text-red-400"}`}>{watch("descricao").trim().length}/500</InputGroupText>
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
                            <Input placeholder="Ex.: Codigi interno do produto" aria-invalid={!!errors.codigo} {...register("codigo")}/>
                            {errors.codigo && <FieldError>{errors.codigo.message}</FieldError>}
                        </Field>
                        <Field>
                            <FieldLabel>Markup do produto</FieldLabel>
                            <Input min={1} aria-invalid={!!errors.markup}  placeholder="Insira o markup" {...register("markup")}/>
                            {errors.markup && <FieldError>{errors.markup.message}</FieldError>}
                        </Field>
                    </div>
                    <Field>
                        <FieldLabel>Categoria do produto</FieldLabel>
                        <Combobox defaultValue={produto.categoria} items={listaCategorias} onValueChange={(c) => setValue("categoriaId", c?.id, { shouldValidate: true, shouldDirty: true })} itemToStringLabel={(i:CategoriaProdutoResponse)=>i.nome}>
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
                            <Input type="number" min="1" placeholder="Ex.: 3" aria-invalid={!!errors.quantMinima} {...register("quantMinima")}/>
                            {errors.quantMinima && <FieldError>{errors.quantMinima.message}</FieldError>}
                        </Field>
                    </div>
                </FieldGroup>

                <DialogFooter>
                    <Button variant="outline" type="button" onClick={dialogProps.close}>Cancelar</Button>
                    <Button type="submit" disabled={isPending || !isValid || !isDirty }>
                        {isPending && <Spinner />}
                        Salvar
                    </Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}