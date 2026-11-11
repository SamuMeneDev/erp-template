import { AccordionContent, AccordionItem, AccordionTrigger, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui"
import { useMensagemChamadoFindAll } from "@erp-template/services"
import type { ChamadoResponse, StatusChamado, UsuarioRoles } from "@erp-template/types"
import { MensagemChamadoCreate } from "./mensagem/MensagemChamadoCreate"
import { useAuth } from "@erp-template/contexts"
import { MensagemItem } from "./mensagem/MensagemItem"
import { useDialog } from "@/hooks"
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react"
import { ChamadoEditDialog } from "./ChamadoEditDialog"
import { ChamadoDeleteDialog } from "./ChamadoDeleteDialog"
import { chamadoPrioridadeColors, corStatusChamado } from "@/utils/chamadoPrioridadeColors"
import { ChamadoEditStatusDialog } from "./ChamadoEditStatusDialog"
import { Repetidor } from "../../_skeleton"
import { MensagemChamadoSkeleton } from "../../_skeleton/MensagemChamadoSkeleton"
import { Functions } from "@erp-template/util"

type ChamadoItemProps = {
    chamado: ChamadoResponse
}

export function ChamadoItem({ chamado }: ChamadoItemProps) {

    const { data, isPending } = useMensagemChamadoFindAll(chamado.id);

    const { usuario } = useAuth();

    // Verifica se o autor de uma mensagem é o usuário autenticado, pelo id da mensagem no parâmetro
    const innerMsg = (idAutor:number)=>idAutor==usuario?.id;


    return (
        <div className="flex items-baseline">
            <ChamadoItemMenu chamado={chamado} />
            <AccordionItem className="w-full">
                <AccordionTrigger>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <div className="flex flex-col">
                            <span>{chamado.titulo}</span>
                            <span className="text-xs text-stone-500">{chamado.categoria.nome}</span>
                            <span className={`${chamadoPrioridadeColors(chamado.categoria.urgencia)}`}>Urgência {chamado.categoria.urgencia}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span>{Functions.dateTimeFormat(chamado.dataCriacao)}</span>
                            <span className={`${corStatusChamado(chamado.status)}`}>{chamado.status}</span>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col">
                        <p>{chamado?.descricao ?? "Sem descrição"}</p>
                    </div>
                    <div className="flex flex-col p-2">
                        <h2 className="text-lg font-medium">Mensagens</h2>
                        <div className="flex flex-col gap-5">
                            {data?.data && data.data.content.length < 1 && (
                                <p className="text-center text-stone-500">Nenhuma mensagem encontrada</p>
                            )}
                            {data?.data && data.data.content.map(m=>(
                                <div key={m.id} className={`flex ${innerMsg(m.autor.id) ? "justify-end":"justify-start"}`}>
                                    <MensagemItem mensagem={m} />
                                </div>
                            ))}
                            {isPending && (
                                <div>
                                    <Repetidor elemento={<MensagemChamadoSkeleton />} vezes={3} />
                                </div>
                            )}
                        </div>
                        {chamado.status !== "CONCLUIDO" && <MensagemChamadoCreate chamado={chamado} />}
                    </div>
                </AccordionContent>
            </AccordionItem>
            
        </div>
    )
}

type ChamadoItemMenuProps = ChamadoItemProps & {}

/**
 * Função que processa se, dependendo do caso, o usuário pode excluir um chamado.
 * Um admin só pode excluir um chamado, se esse tiver o status Concluido, caso contrário, é permitido.
 */ 

function podeExcluir(usuarioStatus: UsuarioRoles, chamadoStatus: StatusChamado ) {
    if(usuarioStatus=="ADMIN") {
        if(chamadoStatus!=="CONCLUIDO") {
            return false;
        }
    }
    return true;
}

function ChamadoItemMenu({ chamado }: ChamadoItemMenuProps) {
    /**
     * Estados do dialog de editar insumo
     */
    const dialogEdit = useDialog();

    /**
     * Estados do alert dialog de excluir insumo
     */
    const dialogDelete = useDialog();

    const dialogStatusEdit = useDialog();

    const { usuario } = useAuth();

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
                    {usuario?.role == "ADMIN" && (
                        <DropdownMenuItem className="cursor-pointer" onClick={dialogStatusEdit.open}>
                            Alterar status
                        </DropdownMenuItem>
                    )}
                    {podeExcluir(usuario?.role ?? "", chamado.status) && (
                        <DropdownMenuItem className="cursor-pointer" onClick={dialogDelete.open} variant="destructive">
                            <Trash2/>
                            Excluir
                        </DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            {dialogEdit.isOpen && <ChamadoEditDialog chamado={chamado} {...dialogEdit}/>}
            {dialogDelete.isOpen && <ChamadoDeleteDialog chamado={chamado} {...dialogDelete}/>}
            {(dialogStatusEdit.isOpen && usuario?.role == "ADMIN" && <ChamadoEditStatusDialog chamado={chamado} {...dialogStatusEdit}/>)}
        </>
    )
}