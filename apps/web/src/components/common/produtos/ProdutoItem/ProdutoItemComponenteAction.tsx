import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useProdutoItemContext } from "@/contexts";
import { useDialog } from "@/hooks";
import type { ComponenteResponse } from "@erp-template/types";
import { Functions } from "@erp-template/util";
import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { ComponenteCreateDialog } from "../componente/ComponenteCreateDialog";
import { ComponenteEditDialog } from "../componente/ComponenteEditDialog";
import { ComponenteDeleteDialog } from "../componente/ComponenteDeleteDialog";

/**
 * Parte do componente {@link ProdutoItem} para adicionar, consultar e remover insumos a o produto (componentes).
 */
export function ProdutoItemComponenteAction() {

    /**
     * Objeto produto no contexto para acesso na composição de componentes.
     */
    const { produto } = useProdutoItemContext();

    /**
     * Estados do dialog de adicionar componente
     */
    const dialogCreate = useDialog();

    return (
        <div>
            <h2 className="font-medium text-xl">Insumos</h2>
            <Button onClick={dialogCreate.open} variant="secondary">
                <Plus />
                <span>Adicionar Insumo</span>
            </Button>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead colSpan={2}>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {produto.componentes &&  produto.componentes.map((c: ComponenteResponse) =>
                        <TableRow key={c.id}>
                            <TableCell title={c.insumo.nome}>{c.insumo.nome}</TableCell>
                            <TableCell title={c.insumo.categoria?.nome}>{c.insumo.categoria?.nome || ""}</TableCell>
                            <TableCell>{c.quantidade}</TableCell>
                            <TableCell>{Functions.currencyFormat(c.quantidade * c.insumo.preco)}</TableCell>
                            <TableCell>
                                <ProdutoItemComponenteActionMenu componente={c} />
                            </TableCell>
                        </TableRow>
                    )}
                    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Custo material</TableCell>
                        <TableCell colSpan={2}>
                            <p className="text-sm font-semibold">{Functions.currencyFormat(produto.custoMaterial)}</p>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            {dialogCreate.isOpen && <ComponenteCreateDialog  {...dialogCreate}/>}
        </div>
    );
}

type ProdutoItemComponenteActionMenuProps = {
    componente: ComponenteResponse
}
function ProdutoItemComponenteActionMenu({ componente }: ProdutoItemComponenteActionMenuProps) {

    /**
     * Estado do formulário de edição
     */
    const dialogEdit = useDialog();

    /**
     * Estado do formulário de edição
     */
    const dialogDelete = useDialog();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost">
                    <EllipsisVertical />
                </Button>
            } />
            <DropdownMenuContent>
                <DropdownMenuItem onClick={dialogEdit.open}>
                    <Pencil />
                    <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={dialogDelete.open} variant="destructive">
                    <Trash2 />
                    <span>Excluir</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
            {dialogDelete.isOpen && <ComponenteDeleteDialog componente={componente} {...dialogDelete}/>}
            {dialogEdit.isOpen && <ComponenteEditDialog componente={componente} {...dialogEdit}/>}
        </DropdownMenu>

    )

}