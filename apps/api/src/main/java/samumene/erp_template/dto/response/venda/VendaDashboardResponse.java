package samumene.erp_template.dto.response.venda;

import java.util.List;

public record VendaDashboardResponse(
   Double lucroLiquidoSemana,
   Double lucroLiquidoDia,
   Double fatLiquidoSemana,
   Double fatLiquidoDia,
   List<VendaDashboardDia> vendasSemana,
   List<VendaPrecificacaoDashboardResponse> precificacoesDia,
   List<VendaPrecificacaoDashboardResponse> precificacoesSemana
) {}