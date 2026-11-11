package samumene.erp_template.dto.request.desconto;

import jakarta.validation.constraints.*;
import samumene.erp_template.enumeration.ETipoValorDesconto;

public record DescontoPrecificacaoCreateRequest(
    @Size(min = 3, message = "O nome deve ter no mínimo 3 caractéres")
    String nome,

    @DecimalMin(value = "0", message = "O valor deve ser maior ou igual a zero.")
    Double valor,
    @Pattern(regexp = ETipoValorDesconto.tipoRegExp, message = "Tipo de valor de desconto inválido")
    String tipoValor,
    Long idPrecificacao
) {}
