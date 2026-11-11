import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, TableCell, TableRow } from "@/components/ui"
import type { VendaResponse } from "@erp-template/types"
import { Functions } from "@erp-template/util"
import { Ban, EllipsisVertical, RefreshCcw, Trash2 } from "lucide-react"
import { VendaDeleteDialog } from "./VendaDeleteDialog"
import { useDialog } from "@/hooks"
import { VendaCancelDialog } from "./VendaCancelDialog"
import { currencyColorClass } from "@/utils/LayoutUtils"

type VendaListViewItemProps = {
    venda: VendaResponse
}
export function VendaListViewItem({ venda }: VendaListViewItemProps) {
    return (
        <TableRow className={venda.status == "CANCELADA" ? "line-through" : ""}>
            <TableCell>{new Date(venda.dataCriacao).toLocaleDateString()}</TableCell>
            <TableCell>
                <ul className="flex flex-col gap-3">
                    {venda.selecoesVenda.map(sl=>(
                        <li key={sl.id} className="flex gap-5">
                            <span className="font-semibold">x {sl.quantidade}</span>
                            {sl.produto.codigo && <span className="bg-primary px-2 text-primary-foreground font-semibold">{sl.produto.codigo}</span>}
                            <span>{sl.produto.nome}</span>
                        </li>
                    ))}
                </ul>
            </TableCell>
             <TableCell>{venda.precificacao.nome}</TableCell>
            <TableCell className="font-semibold">{Functions.currencyFormat(venda.valorVendaTotal)}</TableCell>
            <TableCell className={`${currencyColorClass(venda.faturamentoLiquido)} font-semibold`}>{Functions.currencyFormat(venda.faturamentoLiquido)}</TableCell>
            <TableCell className={`${currencyColorClass(venda.lucroLiquido)} font-semibold`}>{Functions.currencyFormat(venda.lucroLiquido)}</TableCell>
            <TableCell>
                <VendaListViewItemMenu venda={venda} />
            </TableCell>
        </TableRow>
    )
}

type VendaListViewItemMenuProps = {
    venda: VendaResponse;
}

function VendaListViewItemMenu({ venda }: VendaListViewItemMenuProps) {

    const deleteDialog = useDialog();
    const cancelDialog = useDialog();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger render={
                    <Button variant="ghost">
                        <EllipsisVertical />
                    </Button>
                } />
                <DropdownMenuContent className="min-w-45">
                    <DropdownMenuItem onClick={cancelDialog.open}>
                        {venda.status == "CANCELADA" ? <RefreshCcw /> : <Ban />}
                        
                        <span>{venda.status == "CANCELADA" ? "Descancelar venda" : "Cancelar Venda"}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteDialog.open} variant="destructive">
                        <Trash2 />
                        <span>Excluir</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {deleteDialog.isOpen && <VendaDeleteDialog venda={venda} {...deleteDialog}/>}
            {cancelDialog.isOpen && <VendaCancelDialog venda={venda} {...cancelDialog} />}
        </>
    )
}