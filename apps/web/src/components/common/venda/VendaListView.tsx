import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useVendaFindAll } from "@erp-template/services";
import type { PagedResponse, VendaResponse } from "@erp-template/types";
import { Repetidor, VendaSkeleton } from "../_skeleton";
import { Pagination } from "../Pagination";
import { VendaListViewItem } from "./VendaListViewItem";

export function VendaListView() {
    const { data, isPending } = useVendaFindAll();
    return (
        <div className="flex flex-col items-center">
            <VendaListViewFilter data={data?.data} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data da Venda</TableHead>
                        <TableHead>Itens vendidos</TableHead>
                        <TableHead>Precificação</TableHead>
                        <TableHead>Valor de Venda</TableHead>
                        <TableHead>Fat. Líquido</TableHead>
                        <TableHead colSpan={2}>Lucro Líquido</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending && <Repetidor elemento={<VendaSkeleton />} vezes={5} />}
                    {data?.data && data.data.content.map(v=><VendaListViewItem key={v.id} venda={v} />)}
                </TableBody>
            </Table>
            {data?.data && data.data.content.length < 1 && (
                <span className="text-stone-500 font-medium">Nenhum registro encontrado</span>
            )}
        </div>
    )
}

type VendaListViewFilterProps = {
    data?: PagedResponse<VendaResponse>;
}

function VendaListViewFilter({ data }: VendaListViewFilterProps) {
    return (
        <div className="flex gap-3 py-3 flex-col w-full">
            <Pagination data={data} />
        </div>
    )
}
