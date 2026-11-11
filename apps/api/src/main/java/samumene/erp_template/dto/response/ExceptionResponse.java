package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

/**
 * DTO de resposta usada para exibir uma resposta de uma exceção ocorrida no sistema.
 *
 * @param timestamp Data de ocorrência.
 * @param status Nome do status HTTP da resposta.
 * @param statusCode Código do status HTTP da resposta.
 * @param error Mensagem do erro ocorrido.
 */
public record ExceptionResponse(
    LocalDateTime timestamp,
    String status,
    Integer statusCode,
    String error
) {}