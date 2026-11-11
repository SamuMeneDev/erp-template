import { Accordion, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { useAdminChamadoFindAll } from "@erp-template/services";
import { ChamadoItem } from "../suporte/chamado/ChamadoItem";
import type { ChamadoResponse } from "@erp-template/types";

export function SuporteAdminListView() {
    const { data } = useAdminChamadoFindAll();

    const listaChamados = data?.data ?? [];

    // Lista de chamados filtrado pelo status PENDENTE
    const pendentes = listaChamados.filter(c=>c.status==="PENDENTE");

    // Lista de chamados filtrado pelo status EM_ANDAMENTO
    const andamento = listaChamados.filter(c=>c.status==="EM_ANDAMENTO");

    // Lista de chamados filtrado pelo status CONCLUIDO
    const concluido = listaChamados.filter(c=>c.status==="CONCLUIDO");
    
    return (
        <div className="flex flex-col gap-5">
            <h2>Lista de chamados</h2>
            <Tabs>
                <TabsList>
                    <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                    <TabsTrigger value="andamento">Em Andamento</TabsTrigger>
                    <TabsTrigger value="concluido">Concluído</TabsTrigger>
                </TabsList>
                <SecaoChamado listaChamado={pendentes} value="pendente" />
                <SecaoChamado listaChamado={andamento} value="andamento"  />
                <SecaoChamado listaChamado={concluido} value="concluido" />
            </Tabs>
        </div>
    )
}

type SecaoChamadoProps = {
    listaChamado: ChamadoResponse[],
    value: string
}
/**
 * Componente que abstrai a filtragem de chamados por status.
 * @returns 
 */
function SecaoChamado({ listaChamado, value }: SecaoChamadoProps) {
    return (
        <TabsContent value={value}>
            <Accordion>
                {listaChamado.map(c=>(
                    <ChamadoItem key={c.id} chamado={c} />
                ))}
                {listaChamado.length < 1 && <span className="text-stone-500">Nenhum chamado encontrado</span>}
            </Accordion>
        </TabsContent>
    )
}