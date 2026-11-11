package samumene.erp_template.dto.request.chamado;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record CategoriaChamadoCreateRequest(
        @NotNull(message = "O nome é obrigatório")
        @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
        String nome,
        @PositiveOrZero(message = "O grau mínimo de urgência (mais importante) é zero")
        Short urgencia
) {}
