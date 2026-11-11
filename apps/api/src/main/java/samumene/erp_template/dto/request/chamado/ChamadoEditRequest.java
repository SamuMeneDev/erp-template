package samumene.erp_template.dto.request.chamado;

public record ChamadoEditRequest(
    Long idCategoria,
    String titulo,
    String descricao
) {}
