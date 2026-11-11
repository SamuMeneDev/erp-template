package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

import samumene.erp_template.enumeration.StatusChamado;

public record ChamadoResponse(
    Long id,
    UsuarioResponse autor,
    CategoriaChamadoResponse categoria,
    String titulo,
    LocalDateTime dataCriacao,
    LocalDateTime dataModificacao,
    String descricao,
    StatusChamado status
    // List<MensagemChamadoResponse> mensagens
) {}
