import { Button, Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import type { InsumoResponse } from "@erp-template/types/response/InsumoResponse";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { InsumoEditDialog } from "./InsumoEditDialog";
import { useDialog } from "@/hooks";
import { InsumoDeleteDialog } from "./InsumoDeleteDialog";
import { Functions } from "@erp-template/util";
type InsumoCardProps = {
    insumo: InsumoResponse
}

/**
 * Componente que exibe um card com a foto, descrição e outros atributos de um Insumo
 */
export function InsumoCard({ insumo }: InsumoCardProps) {
    return (
        <Card className="max-w-xs">
            <img className=" aspect-square bg-auto" src={insumo?.urlFoto || "https://placehold.co/400"} alt="placeholder" />
            <CardContent>
                <div className="grid grid-cols-6">
                    <div className="flex flex-col col-span-5">
                        {
                            <span className="text-stone-600">
                                {insumo.categoria && insumo.categoria.nome}  
                            </span>
                        }
                        <div className="flex items-baseline gap-1">
                            <h2 className="text-xl font-medium">{insumo.nome}</h2>
                            <span className={`${insumo.quantAtual < insumo.quantMinima 
                            ? "text-red-800" : "text-green-600"} text-sm font-bold`}>
                                {insumo.quantAtual}/{insumo.quantMinima}
                            </span>
                        </div>
                        <span className="font-semibold">{Functions.currencyFormat(insumo.preco)}</span>
                    </div>
                    <div className="col-span-1">
                        <InsumoCardMenu insumo={insumo} />
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

/**
 * Menu de opções do card de insumo.
 */
function InsumoCardMenu({ insumo }: InsumoCardProps) {
    /**
     * Estados do dialog de editar insumo
     */
    const dialogEdit = useDialog();

    /**
     * Estados do alert dialog de excluir insumo
     */
    const dialogDelete = useDialog();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <Button variant="ghost" size="icon-sm">
                        <EllipsisVerticalIcon/>
                    </Button>
                }/>
                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer" onClick={dialogEdit.open}>
                        <Pencil />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={dialogDelete.open} variant="destructive">
                        <Trash2/>
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            {dialogDelete.isOpen && <InsumoDeleteDialog insumo={insumo}  {...dialogDelete}/>}
            {dialogEdit.isOpen && <InsumoEditDialog insumo={insumo} {...dialogEdit}/>}
        </>
    )
}