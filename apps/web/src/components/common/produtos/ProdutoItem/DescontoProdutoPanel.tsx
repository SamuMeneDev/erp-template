import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { DescontoProdutoCreateDialog } from "./desconto/DescontoProdutoCreateDialog";
import { useProdutoItemContext } from "@/contexts/ProdutoItemContext";
import { useDialog } from "@/hooks/use-dialog";
import { useDescontoProdutoFindAll } from "@erp-template/services";
import { Functions } from "@erp-template/util";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { DescontoProdutoDeleteDialog } from "./desconto/DescontoProdutoDeleteDialog";
import { DescontoProdutoEditDialog } from "./desconto/DescontoProdutoEditDialog";
import type { DescontoProdutoResponse } from "@erp-template/types";
import { DescontoProdutoSkeleton, Repetidor } from "../../_skeleton";

export function DescontoProdutoPanel() {

    const { produto } = useProdutoItemContext();

    /**
     * Estados do dialog de criação de desconto do produto.
     */
    const { close: closeCreate, isOpen: isOpenCreate, open: openCreate } = useDialog();


    const { data, isPending }  = useDescontoProdutoFindAll(produto.id);

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-3">
                <h2 className="text-xl font-medium">Desconto do produto</h2>
                <Button variant="secondary" onClick={openCreate}>
                    Adicionar desconto do produto
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead colSpan={2}>Valor</TableHead>
                    </TableRow>
                    {data?.data && data.data.map(d=>(
                        <ProdutoDescontoItem key={d.id} desconto={d} />
                    ))}
                    {isPending && <Repetidor elemento={<DescontoProdutoSkeleton />} vezes={3} />}

                    {data?.data && data.data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center text-stone-400">Nenhum desconto para esse produto</TableCell>
                        </TableRow>
                    )}
                </TableHeader>
            </Table>
            <DescontoProdutoCreateDialog isOpen={isOpenCreate} close={closeCreate} produto={produto} />
        </div>
    )
}


function ProdutoDescontoItem({desconto}: {desconto: DescontoProdutoResponse}) {
    const { close: closeEdit, isOpen: isOpenEdit, open: openEdit } = useDialog();

    const { close: closeDelete, isOpen: isOpenDelete, open: openDelete } = useDialog();

    return (
        <TableRow key={desconto.id}>
            <TableCell>{desconto.nome}</TableCell>
            <TableCell>{Functions.descontoFormat(desconto)}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="ghost">
                            <EllipsisVertical />
                        </Button>
                    } />
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer" onClick={openEdit}>
                            <Pencil />
                            <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={openDelete} variant="destructive">
                            <Trash2 />
                            <span>Excluir   </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            {isOpenEdit && <DescontoProdutoEditDialog isOpen={isOpenEdit} close={closeEdit} desconto={desconto} /> }
            {isOpenDelete && <DescontoProdutoDeleteDialog isOpen={isOpenDelete} close={closeDelete} desconto={desconto} /> }
        </TableRow>
    )
}