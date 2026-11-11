package samumene.erp_template.dto.response.venda;

import samumene.erp_template.dto.response.PrecificacaoResponse;

/**
 * Record que encapsula o retorno de API para
 * quantidades vendidas de uma plataforma na dashboard.
 */
public record VendaPrecificacaoDashboardResponse(
        PrecificacaoResponse precificacao,
        Integer quantidade
) {}
