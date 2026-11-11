package samumene.erp_template.dto.request.venda;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record VendaCreateRequest(
        Long precificacaoId,
        @Valid
        @NotEmpty(message = "A venda deve conter pelo menos um produto selecionado")
        List<SelecaoVendaCreateRequest> selecoesVenda
) {}
