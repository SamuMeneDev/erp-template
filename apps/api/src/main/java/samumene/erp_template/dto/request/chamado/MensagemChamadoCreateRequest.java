package samumene.erp_template.dto.request.chamado;

import jakarta.validation.constraints.NotNull;

public record MensagemChamadoCreateRequest(
    @NotNull(message = "A mensagem não pode ser vazia")
    String mensagem
) {}
