package samumene.erp_template.dto.request.desconto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import samumene.erp_template.enumeration.ETipoValorDesconto;
import samumene.erp_template.enumeration.Status;

public record DescontoPrecificacaoEditRequest(
        @Size(min = 3, message = "O nome do desconto deve ter no mínimo 3 caracteres")
        String nome,
        @DecimalMin(value = "0", message = "O valor mínimo é 0.00")
        Double valor,
        @Pattern(regexp = ETipoValorDesconto.tipoRegExp, message = "Tipo de valor inválido")
        String tipoValor,
        @Pattern(regexp = Status.statusRegExp)
        String status
) {}
