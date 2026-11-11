import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger, toast, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { ChevronDown, ChevronUp, Clipboard, Trash2 } from "lucide-react";
import { useDialog } from "@/hooks";
import { useProdutoItemContext } from "@/contexts";
import { ProdutoDeleteDialog } from "../ProdutoDeleteDialog";
import { ProdutoEditDialog } from "../ProdutoEdtiDialog";
import { Functions } from "@erp-template/util";
import { useState } from "react";

function copiarTexto(texto: string) {
    navigator.clipboard.writeText(texto)
    .then(()=>{
        toast.add({
            title: "Descrição copiada para área de transferência",
            timeout: 5000,
            type: "info"
        });
    }).catch(err=>{
        toast.add({
            title: err,
            timeout: 5000,
            type: "error"
        });
    })
}

/**
 * Antigo (ProdutoListItemView.tsx)
 * Faz parte do componente de {@link PrdotuoItem}, onde trás a foto do produto
 * e actions que podem ser tomadas a respeito deste produto.
 */
export function ProdutoItemAction() {
    /**
     * Contexto com o produto atual na composição
     */
    const { produto } = useProdutoItemContext();

    /**
     * Estado do dialog de edição
     */
    const deleteDialog = useDialog();
    
    /**
     * Estado do dialog de edição
     */
    const editDialog = useDialog();

    // Estado do collapsable para ver a descrição.
    const [openDesc, setOpenDesc] = useState(false);

    return (
        <>
            <img className="w-full rounded-lg" src={produto?.urlFoto || "https://placehold.co/600x400"} alt="Imagem placeholder" />
            <div className="flex flex-col gap-3 pt-2 h-full">
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-semibold">{Functions.currencyFormat(produto.valorVenda)}</span>
                            <span className={`${produto.quantAtual < produto.quantMinima 
                                ? "text-red-800" : "text-green-600"} text-lg font-medium`}>{produto.quantAtual}/{produto.quantMinima}</span>
                        </div>
                    </div>
                    <p className="text-sm text-stone-500">Markup: {produto.markup}</p>
                </div>


                <div className="flex flex-wrap gap-3">
                    <Button onClick={editDialog.open} variant="secondary">
                        Editar Produto
                    </Button>
                    <Button onClick={deleteDialog.open}>
                        <Trash2 />
                        <span>Excluir produto</span>
                    </Button>
                </div>

                <div className="flex items-center">
                    <Collapsible className="w-full" open={openDesc} onOpenChange={setOpenDesc}>
                    
                        <CollapsibleTrigger render={
                        <Button variant="link" disabled={!produto.descricao}>
                            {produto?.descricao ? "Ver descrição" : "Sem descrição"}
                            {openDesc ? <ChevronUp /> : <ChevronDown />}
                        </Button>} />
                        {produto.descricao && (
                            <Tooltip>
                                <TooltipTrigger render={
                                    <Button onClick={()=>copiarTexto(produto.descricao ?? "")} variant="ghost" size="icon-sm">
                                        <Clipboard />
                                    </Button>
                                }/>
                                <TooltipContent>
                                    <p>Copiar descrição</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                        <CollapsibleContent className="flex justify-baseline">
                            <div className="h-full w-full overflow-y-scroll p-2 rounded-lg bg-secondary">
                                <p className="text-sm wrap-break-word">{produto.descricao}</p>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>

            </div>
            {deleteDialog.isOpen && <ProdutoDeleteDialog produto={produto} {...deleteDialog}/>}
            {editDialog.isOpen && <ProdutoEditDialog produto={produto} {...editDialog}/>}
        </>
    )
}