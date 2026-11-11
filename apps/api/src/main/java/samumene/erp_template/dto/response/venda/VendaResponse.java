package samumene.erp_template.dto.response.venda;

import java.time.LocalDateTime;
import java.util.List;

import samumene.erp_template.dto.response.PrecificacaoResponse;
import samumene.erp_template.dto.response.SelecaoVendaResponse;
import samumene.erp_template.enumeration.StatusVenda;

public record VendaResponse(
        Long id,
        StatusVenda status,
        Double valorVendaTotal,
        Double faturamentoLiquido,
        Double lucroLiquido,
        LocalDateTime dataCriacao,
        List<SelecaoVendaResponse> selecoesVenda,
        PrecificacaoResponse precificacao
) {}
