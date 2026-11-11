package samumene.erp_template.dto.response;

public record PrecificacaoValorVendaResponse(
        PrecificacaoResponse precificacao,
        Double valorVenda,
        Double lucroLiquido,
        Double margemLiquida
) {
}
