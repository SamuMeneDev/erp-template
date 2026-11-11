import { AccordionContent, AccordionItem, AccordionTrigger, Card, CardContent } from "@/components/ui";
import { ProdutoItemAction } from "./ProdutoItemAction";
import { useProdutoItemContext } from "@/contexts";
import { ProdutoItemComponenteAction } from "./ProdutoItemComponenteAction";
import { ProdutoItemPrecificacao } from "./ProdutoItemPrecificacao";
import { DescontoProdutoPanel } from "./DescontoProdutoPanel";

/**
 * Antigo (ProdutoListItem.tsx)
 * Componente que representa um item acordeon, onde tras os dados do produto.
 * Esse componente é composto por outros menores como:
 *  {@link ProdutoItemAction} traz a foto e actions que podem ser tomadas sobre esse produto.
 */

export function ProdutoItem() {

    /**
     * Objeto produto no contexto para acesso na composição de componentes.
     */
    const { produto } = useProdutoItemContext();

    return (
        <Card>
            <CardContent className="flex items-center">
                
                <AccordionItem className="w-full">
                    <AccordionTrigger className="flex gap-7 items-center">
                        <span className="font-semibold text-xl">{produto.codigo}</span>


                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-medium">{produto.nome}</span>
                            {produto.categoria && <p className="text-stone-600 font-normal">{produto.categoria.nome}</p>}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col lg:grid lg:grid-cols-12 pb-2">
                            <div className="col-span-3">
                               <ProdutoItemAction />
                            </div>
                            <div className="flex flex-col px-7 gap-3 col-span-9">
                                <DescontoProdutoPanel />
                                <ProdutoItemPrecificacao />
                                <ProdutoItemComponenteAction />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
            </CardContent>
        </Card>
    )
}