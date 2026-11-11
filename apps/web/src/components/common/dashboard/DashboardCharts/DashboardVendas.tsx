import { useVendaDashboardFindAll } from "@erp-template/services";
import type { VendaDashboardDiasResponse } from "@erp-template/types";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"


function processarDataDashboard(data: VendaDashboardDiasResponse[]) {
    return data.map(c=>({...c, dia: c.dia!=""?new Date(c.dia+"T00:00:00").toLocaleDateString():""}));
}

export function DashboardVendas() {

    const { data: dataDashboard } = useVendaDashboardFindAll();

    return (
        <BarChart
            style={{ aspectRatio: 1.618, maxHeight: 200, width: "100%" }}
            responsive
            data={processarDataDashboard(dataDashboard?.data.vendasSemana ?? [])}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dia" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#8884d8" activeBar={{ fill: 'pink', stroke: 'blue' }} radius={[10, 10, 0, 0]} />
        </BarChart>
    )
}