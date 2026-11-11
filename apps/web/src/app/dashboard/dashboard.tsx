import { DashboardCard, DashboardVendas } from "@/components/common";
import { DashboardFeaturePrecificacao } from "@/components/common/dashboard/DashboardCharts/DashboardFeaturePrecificacao";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useMe, useVendaDashboardFindAll } from "@erp-template/services";
import { Functions } from "@erp-template/util";

export default function Dashboard() {
    const { data } = useMe();
    const { data: dataDashboard } = useVendaDashboardFindAll();
    
    return (
        <section className="overflow-y-scroll p-4 px-7 w-full">
            <div className="mb-5">
                <h1 className="text-2xl font-medium">Bem vindo, {data?.data.nome}</h1>
                <span>Dashboard</span>
            </div>
            <div className="sm:flex sm:flex-col md:grid md:grid-cols-12 gap-3">
                <div className="col-span-7 w-full">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Vendas nessa semana</CardTitle>
                            <CardDescription>Detalhes das vendas realizadas nos ultimos 7 dias.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <DashboardVendas />
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-5 py-3 flex gap-3 w-full flex-col mb-30">
                    <DashboardCard
                        titulo="Lucro líquido de hoje"
                        descricao="Receita líquida das vendas"
                        content={Functions.currencyFormat(dataDashboard?.data.lucroLiquidoDia || 0)}
                    />
                    <DashboardCard
                        titulo="Lucro líquido líquido Semanal"
                        descricao="Receita líquida das vendas"
                        content={Functions.currencyFormat(dataDashboard?.data.lucroLiquidoSemana || 0)}
                    />
                    <Card className="w-full min-h-[60%]">
                        <CardHeader>
                            <CardTitle>Precificações que mais venderam nessa semana</CardTitle>
                            <CardDescription>Quantidade de precificações nas vendas nessa semana</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <DashboardFeaturePrecificacao />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}