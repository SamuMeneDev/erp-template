package samumene.erp_template.dto.request.venda;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * Esse record é uma dependência de {@link VendaCreateRequest},
 * portanto não é usado em outra controller própria, é um DTO que compõe outro DTO (VendaCreateRequest).
 *
 * @param produtoId Id do produto vendido
 * @param quantidade A quantidade desse produto vendido
 */
public record SelecaoVendaCreateRequest(
        @NotNull(message = "O produto é obrigatório")
        Long produtoId,
        @Min(value = 1, message = "A quantidade mínima deve ser 1")
        Integer quantidade
) {}
