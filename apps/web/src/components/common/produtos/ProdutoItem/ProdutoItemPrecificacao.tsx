import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { useProdutoItemContext } from "@/contexts";
import { usePrecificacaoValores } from "@erp-template/services";
import { Functions } from "@erp-template/util";
import { ProdutoPrecosSkeleton, Repetidor } from "../../_skeleton";
import { currencyColorClass } from "@/utils/LayoutUtils";

/**
 * Componente que renderiza os valores do produto com todas as precificações.
 */
export function ProdutoItemPrecificacao() {


    const { produto } = useProdutoItemContext();

    const { data, isPending } = usePrecificacaoValores(produto.id);

    return (
        <div className="flex flex-col">
            <h2 className="text-xl font-medium">Precificação</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Valor de venda</TableHead>
                        <TableHead>Lucro Líquido</TableHead>
                        <TableHead>Margem Líquida</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data && data.data.map(p=>(
                        <TableRow key={p.precificacao.id}>
                            <TableCell>{p.precificacao.nome}</TableCell>
                            <TableCell>{Functions.currencyFormat(p.valorVenda)}</TableCell>
                            <TableCell className={`${currencyColorClass(p.lucroLiquido)} font-medium`}
                            >{Functions.currencyFormat(p.lucroLiquido)}</TableCell>
                            <TableCell className={`${currencyColorClass(p.lucroLiquido)} font-medium`}
                            >{p.margemLiquida.toFixed(2)}%</TableCell>
                        </TableRow>
                    ))}
                    {isPending &&
                    <Repetidor elemento={<ProdutoPrecosSkeleton />} vezes={3} />}
                </TableBody>
            </Table>
        </div>
    )
}