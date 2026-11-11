import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { coresGrafico } from "@/utils/dashboardColors";
import { useVendaDashboardFindAll } from "@erp-template/services";
import type { VendaPrecificacaoDashboardResponse } from "@erp-template/types";
import { Legend, Pie, PieChart, Tooltip } from "recharts";

function processarDataDashboard(data: VendaPrecificacaoDashboardResponse[]) {
  return data.map((v, index)=>({precificacao: v.precificacao.nome, quantidade: v.quantidade, fill: coresGrafico.at(index)}));
}

export function DashboardFeaturePrecificacao() {

  const { data } = useVendaDashboardFindAll();

const chartConfig = {
  vendas: {
    label: "Vendas",
  },
  bolos: {
    label: "Bolos",
    color: "hsl(var(--chart-1))", // Usa as variáveis de cor do seu tema global
  },
  doces: {
    label: "Doces",
    color: "hsl(var(--chart-2))",
  },
  cestas: {
    label: "Cestas",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig
    return (
        <ChartContainer style={{maxHeight: 250, width: "100%"}} config={chartConfig}>
            <PieChart>
                <Pie
                    data={processarDataDashboard(data?.data.precificacoesSemana ?? [])}
                    dataKey="quantidade"      // Qual propriedade define o tamanho da fatia
                    nameKey="precificacao"   // Qual propriedade define o nome da fatia
                    innerRadius={0}       // 0 para Pizza inteira. Mude para 60 para virar um Donut (Rosca)!
                    strokeWidth={5}       // Linha de separação entre as fatias
                />
                <Tooltip />
                <Legend />
            </PieChart>
        </ChartContainer>
    )
}