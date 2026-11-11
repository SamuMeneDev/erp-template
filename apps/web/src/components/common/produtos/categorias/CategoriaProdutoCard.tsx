import { Button, Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import type { CategoriaProdutoResponse } from "@erp-template/types";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { useDialog } from "@/hooks";
import { CategoriaProdutoEditDialog } from "./CategoriaProdutoEditDialog";
import { CategoriaProdutoDeleteDialog } from "./CategoriaProdutoDeleteDialog";

type CategoriaProdutoCardProps = {
    categoria: CategoriaProdutoResponse
}

/**
 * Card que exibe uma categoria
 */
export function CategoriaProdutoCard({ categoria }: CategoriaProdutoCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between gap-5">
                <span>{categoria.nome}</span>
                <CategoriaInsumoCardMenu categoria={categoria} />
            </CardContent>
        </Card>
    )
}


function CategoriaInsumoCardMenu({ categoria }: CategoriaProdutoCardProps) {

    // Estado do dialog de exclusão.
    const { close: closeDelete, isOpen: isOpenDelete, open: openDelete } = useDialog();

    // Estadi dialog de edição
    const { close: closeEdit, isOpen: isOpenEdit, open: openEdit } = useDialog();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" />}>
                    <EllipsisVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer" onClick={openEdit}>
                        <Pencil />
                        <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={openDelete} variant="destructive">
                        <Trash2 />
                        <span>Excluir</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <CategoriaProdutoEditDialog categoria={categoria}  close={closeEdit} isOpen={isOpenEdit} />
            <CategoriaProdutoDeleteDialog categoria={categoria} close={closeDelete} isOpen={isOpenDelete} />
        </>
    )
}