import { Button } from "@/components/ui";
import { PrecificacaoListView } from "./PrecificacaoListView";
import { Plus } from "lucide-react";
import { useDialog } from "@/hooks";
import { PrecificacaoCreateDialog } from "./PrecificacaoCreateDialog";

/**
 * Componente que carrega a listagem de precificação (e seus descontos), e o formulário de criação de uma nova
 * precificação.
 */
export function PrecificacaoPanel() {

    // Estados do dialog de criação de precificações.
    const { close, isOpen, open } = useDialog();
    return (
        <div className="col-span-5 flex gap-2 flex-col">
            <div className="flex items-center gap-3">
                <span className="text-xl font-medium">Precificações</span>
                <Button onClick={open} variant="default" size="icon-sm">
                    <Plus />
                </Button>
            </div>
            <PrecificacaoListView />
            <PrecificacaoCreateDialog close={close} isOpen={isOpen} />
        </div>
    )
}