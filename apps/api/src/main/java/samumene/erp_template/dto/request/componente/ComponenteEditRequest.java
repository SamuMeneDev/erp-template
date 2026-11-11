package samumene.erp_template.dto.request.componente;

import jakarta.validation.constraints.Min;

public record ComponenteEditRequest(
        Long insumoId,
        @Min(value = 1, message = "O mínimo é 1")
        Integer quantidade
) {}
