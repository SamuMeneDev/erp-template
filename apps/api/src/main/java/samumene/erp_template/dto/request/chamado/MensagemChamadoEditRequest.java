package samumene.erp_template.dto.request.chamado;

import jakarta.validation.constraints.NotNull;

public record MensagemChamadoEditRequest(
    @NotNull (message = "A mensagem não pode ser vazia")
    String mensagem
) {}
