package samumene.erp_template.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import samumene.erp_template.enumeration.Status;

public record PrecificacaoResponse(
        Long id,
        String nome,
        LocalDateTime dataCriacao,
        LocalDateTime dataModificacao,
        Status status,
        List<DescontoPrecificacaoResponse> descontos
) {}
