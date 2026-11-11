package samumene.erp_template.dto.request.chamado;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ChamadoCreateRequest(
        @NotNull(message = "A categoria do chamado deve ser informada")
        Long idCategoria,

        String descricao,

        @NotNull(message = "O título é obrigatório")
        @Size(min = 3, message = "O título deve ter no mínimo 3 caracteres")
        String titulo
) {}
