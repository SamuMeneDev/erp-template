package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

import samumene.erp_template.enumeration.ETipoValorDesconto;
import samumene.erp_template.enumeration.Status;

public record DescontoPrecificacaoResponse(
        Long id,
        String nome,
        Double valor,
        ETipoValorDesconto tipoValor,
        LocalDateTime dataCriacao,
        LocalDateTime dataModificacao,
        Status status
) {}
