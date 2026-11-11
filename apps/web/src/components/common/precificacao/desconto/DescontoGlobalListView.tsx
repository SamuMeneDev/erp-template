import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useDescontoGlobalFindAll } from "@erp-template/services"
import { Functions } from "@erp-template/util";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { DescontoPrecificacaoEditDialog } from "./DescontoPrecificacaoEditDialog";
import { useDialog } from "@/hooks";

import type { DescontoPrecificacaoResponse } from "@erp-template/types";
import { DescontoPrecificacaoDeleteDialog } from "./DescontoPrecificacaoDeleteDialog";
import { DescontoGlobalSkeleton, Repetidor } from "../../_skeleton";

/**
 * Componente que renderiza a lista de descontos globais do sistema.
 */
export function DescontoGlobalListView() {

    const { data, isPending } = useDescontoGlobalFindAll();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <span>Desconto</span>
                    </TableHead>
                    <TableHead>
                        <span>Valor</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.data && data.data.map(d=><DescontoGlobalItem key={d.id} desconto={d} />)}

                {isPending && (
                    <Repetidor elemento={<DescontoGlobalSkeleton />} vezes={3} />
                )}
            </TableBody>
        </Table>
    )
}

type DescontoGlobalItemProps = {
    desconto: DescontoPrecificacaoResponse
}

/**
 * Componente que renderiza um desconto global na lista.
 */
function DescontoGlobalItem({desconto: d}: DescontoGlobalItemProps) {
    // Estados do formulário de edição.
    const { close: closeEdit, isOpen: isOpenEdit, open: openEdit } = useDialog();

    // Estados do formulário de exclusão.
    const { close: closeDelete, isOpen: isOpenDelete, open: openDelete } = useDialog();

    return (
        <TableRow key={d.id}>
            <TableCell>{d.nome}</TableCell>
            <TableCell>{Functions.descontoFormat(d)}</TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger render={
                        <Button variant="ghost" size="icon-sm">
                            <EllipsisVerticalIcon/>
                        </Button>
                    }/>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={openEdit} className="cursor-pointer">
                            <Pencil />
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={openDelete} className="cursor-pointer" variant="destructive">
                            <Trash2/>
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {isOpenEdit && (
                        <DescontoPrecificacaoEditDialog close={closeEdit} isOpen={isOpenEdit} desconto={d} />
                    )}
                    {isOpenDelete && (
                        <DescontoPrecificacaoDeleteDialog close={closeDelete} isOpen={isOpenDelete} desconto={d} />
                    )}
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}