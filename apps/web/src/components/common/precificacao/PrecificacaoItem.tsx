import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import type { DescontoPrecificacaoResponse, PrecificacaoResponse } from "@erp-template/types";
import { Functions } from "@erp-template/util";
import { DescontoPrecificacaoCreateDialog } from "./desconto/DescontoPrecificacaoCreateDialog";
import { useDialog } from "@/hooks";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { DescontoPrecificacaoEditDialog } from "./desconto/DescontoPrecificacaoEditDialog";
import { DescontoPrecificacaoDeleteDialog } from "./desconto/DescontoPrecificacaoDeleteDialog";
import { PrecificacaoDeleteDialog } from "./PrecificacaoDeleteDialog";
import { PrecificacaoEditDialog } from "./PrecificacaoEditDialog";

/**
 * Componente que lista as propriedades de uma precificação e seus descontos.
 */
type PrecificacaoItemProps = {
    precificacao: PrecificacaoResponse
}

export function PrecificacaoItem({ precificacao }: PrecificacaoItemProps) {

    // Estados do formulário de adição de descontos
    const { close: closeCreate, isOpen: isOpenCreate, open: openCreate } = useDialog();

    // Estados do formulário de edição da precificação.
    const { close: closeEdit, isOpen: isOpenEdit, open: openEdit } = useDialog();

    // Estados do formulário de edição da precificação.
    const { close: closeDelete, isOpen: isOpenDelete, open: openDelete } = useDialog();

    return (
        <div className="flex items-start">
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
            </DropdownMenu>
            <Accordion className="border rounded-lg p-2">
                <AccordionItem>
                    <AccordionTrigger>
                        <span className="text-xl">{precificacao.nome}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <span>Descontos aplicados</span>
                        <Button onClick={openCreate} variant="secondary" size="xs">Adicionar desconto</Button>
                        <Table>
                            
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Desconto</TableHead>
                                    <TableHead>Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                            
                            <TableBody>
                                
                                {precificacao.descontos.map(d=>(
                                    <PrecificacaoDescontoItem key={d.id} desconto={d} />
                                ))}
                            </TableBody>
                        </Table>
                        {precificacao.descontos.length < 1 && (
                            <div className="flex justify-center">
                                <span className="text-center text-stone-400">Nenhum desconto para essa precificação</span>
                            </div>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <DescontoPrecificacaoCreateDialog close={closeCreate} isOpen={isOpenCreate} precificacao={precificacao} />
            </Accordion>
            <PrecificacaoEditDialog close={closeEdit} isOpen={isOpenEdit} precificacao={precificacao} />
            <PrecificacaoDeleteDialog close={closeDelete} isOpen={isOpenDelete} precificacao={precificacao} />
        </div>
    )
}

type PrecificacaoDescontoItemProps = {
    desconto: DescontoPrecificacaoResponse
}
function PrecificacaoDescontoItem({ desconto: d }: PrecificacaoDescontoItemProps) {

    // Estado para o dialog de edição;
    const {close: closeEdit, isOpen: isOpenEdit, open: openEdit} = useDialog();

    // Estado para o dialog de edição;
    const {close: closeDelete, isOpen: isOpenDelete, open: openDelete} = useDialog();

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
                </DropdownMenu>
            </TableCell>
            {isOpenEdit && <DescontoPrecificacaoEditDialog close={closeEdit} desconto={d} isOpen={isOpenEdit} />}
            {isOpenDelete && <DescontoPrecificacaoDeleteDialog close={closeDelete} desconto={d} isOpen={isOpenDelete} />}
        </TableRow>
    )
}