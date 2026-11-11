package samumene.erp_template.dto.request.componente;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ComponenteCreateRequest(
        @NotNull(message = "ID do produto não fornecido")
        Long produtoId,
        @NotNull(message = "ID do insumo não fornecido")
        Long insumoId,
        @Min(value = 1, message = "O mínimo é 1")
        Integer quantidade
) {}
