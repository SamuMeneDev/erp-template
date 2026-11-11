package samumene.erp_template.dto.request.precificacao;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import samumene.erp_template.enumeration.Status;

public record PrecificacaoEditRequest(
        @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres.")
        String nome,
        @Pattern(regexp = Status.statusRegExp)
        String status
) {}
