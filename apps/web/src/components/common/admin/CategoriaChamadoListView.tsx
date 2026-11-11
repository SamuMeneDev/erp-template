import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useDialog } from "@/hooks";
import { chamadoPrioridadeColors } from "@/utils/chamadoPrioridadeColors";
import { useCategoriaChamadoFindAll } from "@erp-template/services";
import { EllipsisVerticalIcon, Pencil, Plus } from "lucide-react";
import { CategoriaChamadoCreateDialog } from "./CategoriaChamadoCreateDialog";
import { CategoriaChamadoEditDialog } from "./CategoriaChamadoEditDialog";
import type { CategoriaChamadoResponse } from "@erp-template/types";

export function CategoriaChamadoListView() {
    
    const { data } = useCategoriaChamadoFindAll();
    
    const dialogCreate = useDialog();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <h2>Categorias de chamado</h2>
                <Button onClick={dialogCreate.open} size="icon-sm">
                    <Plus />
                </Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Categoria</TableHead>
                        <TableHead colSpan={2}>Urgência</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data && data.data.map(c=>(
                        <>
                            <TableRow key={c.id}>
                                <TableCell>{c.nome}</TableCell>
                                <TableCell className={`${chamadoPrioridadeColors(c.urgencia)}`} >{c.urgencia}</TableCell>
                                <TableCell colSpan={2}>
                                    <CategoriaChamadoItemMenu categoria={c} />
                                </TableCell>
                            </TableRow>
                            
                        </>
                    ))}
                </TableBody>
            </Table>
            {dialogCreate.isOpen && <CategoriaChamadoCreateDialog {...dialogCreate}/>}
        </div>
    )
}

type CategoriaChamadoItemMenuProps = {
    categoria: CategoriaChamadoResponse
}
function CategoriaChamadoItemMenu({ categoria: c }: CategoriaChamadoItemMenuProps) {

    const dialogEdit = useDialog();
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
                </DropdownMenuContent>
            </DropdownMenu>
            <CategoriaChamadoEditDialog categoria={c} {...dialogEdit}/>
        </>
    )
}