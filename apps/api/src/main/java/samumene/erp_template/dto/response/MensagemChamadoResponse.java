package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

public record MensagemChamadoResponse(
    Long id,
    String mensagem,
    UsuarioResponse autor,
    LocalDateTime dataCriacao,
    LocalDateTime dataModificacao,
    boolean excluido
) {
    /**
     * Caso a mensagem tenha sido excluida, esconde o conteúdo original
     * @param response Objeto Response da mensagem original.
     * @return Retorna outro DTO de resposta, mas filtrado caso tenha sido excluido escondendo o conteúdo original
     * antes da exclusão.
     */
    public static MensagemChamadoResponse ifExclude(MensagemChamadoResponse response) {
        return new MensagemChamadoResponse(
            response.id(),
            response.excluido() ? "Esta mensagem foi apagada" : response.mensagem(),
            response.autor(),
            response.dataCriacao(),
            response.dataModificacao(),
            response.excluido());
    }
}
