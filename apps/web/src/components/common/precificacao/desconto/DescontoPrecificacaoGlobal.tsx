import { Button } from "@/components/ui";
import { useDialog } from "@/hooks";
import { DescontoGlobalListView } from "./DescontoGlobalListView";
import { DescontoPrecificacaoCreateDialog } from "./DescontoPrecificacaoCreateDialog";

/**
 * Componente que carrega a listagem de descontos globais e formulário de criação
 * de descontos globais.
 */
export function DescontoGlobalPanel() {

    /**
     * Estados do dialog de descontos globais
     */
    const { close, open, isOpen } = useDialog()

    return (
        <div className=" col-start-8 gap-2 col-span-5 flex flex-col">
            <div className="flex items-center gap-3">
                <span className="text-xl font-medium">Descontos globais</span>
                <Button onClick={open} variant="secondary" size="sm">
                    Criar um desconto global
                </Button>
            </div>
            <DescontoGlobalListView />
            <DescontoPrecificacaoCreateDialog close={close} isOpen={isOpen} />
        </div>
    )
}