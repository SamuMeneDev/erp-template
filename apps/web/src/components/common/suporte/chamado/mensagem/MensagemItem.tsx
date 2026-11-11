import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui"
import { useDialog } from "@/hooks"
import type { MensagemChamadoResponse } from "@erp-template/types"
import { Ban, EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react"
import { MensagemEditDialog } from "./MensagemEditDialog"
import { useAuth } from "@erp-template/contexts"
import { MensagemDeleteDialog } from "./MensagemDeleteDialog"
import { Functions } from "@erp-template/util"

type MensagemItemProps = {
    mensagem: MensagemChamadoResponse
    showMenu?: boolean
}

export function MensagemItem({ mensagem: m, showMenu = true }: MensagemItemProps) {

    const { usuario } = useAuth();
    const innerMsg = usuario?.id === m.autor.id;

    return (
        <div className="flex flex-col">
            <span className="text-stone-500 text-xs">{innerMsg ? "Você":m.autor.nome}</span>
            <span className="text-stone-500 text-xs">{Functions.dateTimeFormat(m.dataCriacao)}</span>
            <div className={`flex items-center w-fit border gap-2 p-3 rounded-lg`}>
                {m.excluido && <Ban size={20} className="text-stone-500" />}
                <div className="flex flex-col">
                    <span className={`${m.excluido && "text-stone-500"}`}>{m.mensagem}</span>
                </div>
                {(!m.excluido && showMenu && innerMsg) && <MensagemItemMenu mensagem={m} />}
            </div>
        </div>
    )
}

type MensagemItemMenuProps = MensagemItemProps & {}

function MensagemItemMenu({ mensagem }: MensagemItemMenuProps) {
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
            <DropdownMenu >
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
            {dialogDelete.isOpen && <MensagemDeleteDialog mensagem={mensagem} {...dialogDelete}/>}
            {dialogEdit.isOpen && <MensagemEditDialog mensagem={mensagem} {...dialogEdit}/>}
        </>
    )
}