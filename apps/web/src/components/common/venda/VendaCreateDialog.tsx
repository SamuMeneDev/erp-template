import { vendaCreateSchema } from "@erp-template/schemas";
import { BaseDialog } from "../_dialog";
import { usePrecificacaoFindAll, useProdutoFindAll, useVendaCreate } from "@erp-template/services";
import { Button, DialogFooter, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Field, FieldError, FieldGroup, FieldLabel, NativeSelect, NativeSelectOption, ScrollArea, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BaseDialogProps } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import type { ProdutoResponse, VendaCreateRequest } from "@erp-template/types";
import { useToast } from "@/hooks";

interface CarrinhoItemType {
    produto: ProdutoResponse,
    quantidade: number,
    index: number
}

export function VendaCreateDialog(dialogProps: BaseDialogProps) {

    const { data } = usePrecificacaoFindAll();

    const { mutate, isPending, isSuccess} = useVendaCreate()

    const { reset, handleSubmit, register, formState: {errors, isValid} } = useForm({resolver: zodResolver(vendaCreateSchema)});

    

    // Estado de produtos selecionados no carrinho e suas quantidades.
    const [prodSelect, setProdSelect] = useState<CarrinhoItemType[]>([]);

    function submit(data: z.infer<typeof vendaCreateSchema>) {
        const request: VendaCreateRequest = {...data, selecoesVenda: prodSelect.map(p=>{
            return {produtoId: p.produto.id, quantidade: p.quantidade}
        })}

        mutate(request);
    }

    /**
     * Adiciona um ProdutoResponse -- produto selecionado pelo usuuário -- no estado de items
     * no carrinho
     * @param produto produto selecionado pelo usuário para o carrinho
     */
    function adicionarProdutoAoCarrinho(produto: ProdutoResponse) {
        setProdSelect(prev=>[...prev, {produto, quantidade: 1, index: prev.length+1}]);
    }

    useToast({
        config: {timeout: 5000, priority: "high", title: "Venda registrada com sucesso!", type: "success"},
        before: ()=>{
            dialogProps.close();
            reset();
        },
        isSuccess
    })

    return (
        <BaseDialog title="Registrar Venda" {...dialogProps}>
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel>Selecione a precificação da venda</FieldLabel>
                        {errors.precificacaoId && <FieldError>{errors.precificacaoId?.message}</FieldError>}
                        <NativeSelect aria-invalid={!!errors.precificacaoId} {...register("precificacaoId", {valueAsNumber: true})}>
                            {data?.data && data.data.map(p=>(
                                <NativeSelectOption key={p.id} value={p.id} >{p.nome}</NativeSelectOption>
                            ))}
                            {data?.data && data.data.length < 1 && (
                                <NativeSelectOption value="">Nenhuma Precificação disponível</NativeSelectOption>
                            )}
                        </NativeSelect>
                    </Field>
                    <Field>
                        <div className="flex">
                            <FieldLabel>Produtos</FieldLabel>
                            <AdicionarProduto adicionar={adicionarProdutoAoCarrinho} />
                        </div>
                        <Carrinho setProdSelect={setProdSelect} prodSelect={prodSelect} />

                    </Field>
                </FieldGroup>

                <DialogFooter>
                    <Button variant="outline" onClick={dialogProps.close}>Cancelar</Button>
                    <Button disabled={isPending || !isValid || prodSelect.length < 1} type="submit">Adicionar Venda</Button>
                </DialogFooter>
            </form>
        </BaseDialog>
    )
}
type CarrinhoProps = {
    prodSelect: CarrinhoItemType[]
    setProdSelect: (prodSelect: CarrinhoItemType[]) => void
}

/**
 * Componente que renderiza os items selecionados de uma venda e o controle de sua quantidade
 * 
 * @param param0 Estado com os items selecionados.
 */
function Carrinho({ prodSelect, setProdSelect }: CarrinhoProps) {

    // Incrementa a quantidade do item I
    function incrementoQntde(item: CarrinhoItemType) {
        setProdSelect(prodSelect.map(i=>{
            if(i.index===item.index) {
                i.quantidade++;
            }
            return i;
        }))
    }

    // Decrementa a quantidade do item I
    function decrementoQntde(item: CarrinhoItemType) {
        setProdSelect(prodSelect.map(i=>{
            if(i.index===item.index) {
                i.quantidade--;
            }
            return i;
        }))
    }

    // Remove um item I do estado de items
    function removeItem(item: CarrinhoItemType) {
        setProdSelect(prodSelect.filter(i=>i.index!==item.index))
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {prodSelect.map((c, index)=>(
                        <TableRow key={index}>
                            <TableCell className="max-w-50 text-ellipsis overflow-hidden">{c.produto.nome}</TableCell>
                            <TableCell className="flex gap-2 items-center font-bold text-lg">
                                <Button onClick={()=>incrementoQntde(c)} size="icon-sm"><Plus /></Button>
                                {c.quantidade}
                                <Button disabled={c.quantidade < 2} onClick={()=>decrementoQntde(c)} size="icon-sm"><Minus /></Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={()=>removeItem(c)} variant="ghost" size="icon-xs"><X /></Button>
                            </TableCell>
                        </TableRow>
                    ))}  
                    
                </TableBody>
                
            </Table>
            {prodSelect.length < 1 && (
                <div className="flex justify-center">
                    <p className="text-stone-500">Selecione os produtos para a venda</p>
                </div>
            )}
        </>

    )
}

type AdicionarProdutoProps = {
    adicionar: (p: ProdutoResponse)=> void
}

/**
 * Componente que renderiza um Dropdown Menu que permite a seleção de um produto para adicionar no carrinho
 * @param param0 Função que é injetada para salvar o produto selecionado. 
 */
function AdicionarProduto({ adicionar }: AdicionarProdutoProps) {
    const { data } = useProdutoFindAll(new URLSearchParams("size=10"));
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button size="sm" variant="link">Adicionar Produto</Button>
            } />
            <DropdownMenuContent  className="p-2 w-80">
                <span className="font-medium">Selecione um produto</span>
                <ScrollArea className="h-40">
                    {data?.data && data.data.content.map(p=>(
                        <DropdownMenuItem key={p.id} onClick={()=>adicionar(p)}>
                            <span>{p.nome}</span>
                        </DropdownMenuItem>
                    ))}
                </ScrollArea>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}