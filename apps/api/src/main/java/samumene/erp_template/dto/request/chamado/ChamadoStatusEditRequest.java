package samumene.erp_template.dto.request.chamado;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import samumene.erp_template.enumeration.StatusChamado;

public record ChamadoStatusEditRequest(
    @NotNull(message = "O status não pode ser vazio")
    @Pattern(regexp = StatusChamado.statusRegExp, message = "Status inválido")
    String status
) {}
