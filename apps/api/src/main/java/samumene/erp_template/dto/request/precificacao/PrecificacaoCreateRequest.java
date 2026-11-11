package samumene.erp_template.dto.request.precificacao;

import jakarta.validation.constraints.NotEmpty;

public record PrecificacaoCreateRequest(
    @NotEmpty(message = "O nome é obrigatório")
    String nome
) {}
