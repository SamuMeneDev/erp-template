import { Button, Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui";
import type { CategoriaInsumoResponse } from "@erp-template/types";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { CategoriaInsumoDeleteDialog } from "./CategoriaInsumoDeleteDialog";
import { useDialog } from "@/hooks";
import { CategoriaInsumoEditDialog } from "./CategoriaInsumoEditDialog";

type CategoriaInsumoCardProps = {
    categoria: CategoriaInsumoResponse
}

/**
 * Card que exibe uma categoria
 */
export function CategoriaInsumoCard({ categoria }: CategoriaInsumoCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center justify-between gap-5">
                <span>{categoria.nome}</span>
                <CategoriaInsumoCardMenu categoria={categoria} />
            </CardContent>
        </Card>
    )
}


function CategoriaInsumoCardMenu({ categoria }: CategoriaInsumoCardProps) {

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
            <CategoriaInsumoEditDialog categoria={categoria}  close={closeEdit} isOpen={isOpenEdit} />
            <CategoriaInsumoDeleteDialog categoria={categoria} close={closeDelete} isOpen={isOpenDelete} />
        </>
    )
}