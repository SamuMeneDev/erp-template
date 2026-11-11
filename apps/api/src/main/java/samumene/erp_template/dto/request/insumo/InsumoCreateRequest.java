package samumene.erp_template.dto.request.insumo;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record InsumoCreateRequest(
        @Size(message = "O nome deve ter no mínimo 3 caracteres")
        @NotNull(message = "O nome é obrigatório")
        String nome,
        @DecimalMin(value = "0", message = "O valor mínimo é zero")
        Double preco,
        Long categoriaId,

        @PositiveOrZero(message = "O valor mínimo é zero")
        Integer quantAtual,
        String urlFoto
) {}
