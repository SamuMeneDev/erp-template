package samumene.erp_template.dto.request.insumo;

import jakarta.validation.constraints.*;
import samumene.erp_template.enumeration.Status;

public record InsumoEditRequest(
        @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
        String nome,
        @DecimalMin(value = "0", message = "O valor mínimo é zero")
        Double preco,
        Long categoriaId,

        @PositiveOrZero(message = "O valor mínimo é zero")
        Integer quantAtual,
        @Pattern(regexp = Status.statusRegExp, message = "Status inválido")
        String status,
        String urlFoto

) {}
