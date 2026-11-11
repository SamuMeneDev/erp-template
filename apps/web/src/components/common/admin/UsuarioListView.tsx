import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useUsuarioFindAll } from "@erp-template/services"
import { KeyRound } from "lucide-react";
import { AdminUsuarioListSkeleton, Repetidor } from "../_skeleton";
import type { UsuarioResponse } from "@erp-template/types";
import { useDialog } from "@/hooks";
import { UsuarioSolicitacaoSenhaDialog } from "./UsuarioSolicitacaoSenhaDialog";

/**
 * Lista que carrega todos os usuários cadastrados no sistema.
 */
export function UsuarioListView() {
    
    const { data, isPending } = useUsuarioFindAll();

    return (
        <div className="flex p-3">
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={2}>Nome</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data && data.data.filter(u=>u.role!=="ADMIN").map(u=>(
                        <UsuarioListViewItem key={u.id} usuario={u} />
                    ))}
                    {isPending && <Repetidor vezes={4} elemento={<AdminUsuarioListSkeleton />} />}
                </TableBody>
            </Table>
        </div>
    )
}
type UsuarioListViewItemProps = {
    usuario: UsuarioResponse
}
function UsuarioListViewItem({ usuario: u }: UsuarioListViewItemProps) {
    const dialog = useDialog();
    return (
        <>
            <TableRow>
                <TableCell colSpan={1}>{u.nome}</TableCell>
                <TableCell colSpan={1} className="flex gap-5">
                    <Button onClick={dialog.open} title="Alterar senha" variant="outline" size="icon-sm">
                        <KeyRound />
                    </Button>
                </TableCell>
            </TableRow>
            {dialog.isOpen && <UsuarioSolicitacaoSenhaDialog usuario={u} {...dialog} />}
        </>
)
}