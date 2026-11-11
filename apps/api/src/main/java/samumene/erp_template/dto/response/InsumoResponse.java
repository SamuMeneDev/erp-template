package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

import samumene.erp_template.enumeration.Status;

public record InsumoResponse(
    Long id,
    String nome,
    double preco,
    CategoriaInsumoResponse categoria,
    int quantMinima,
    int quantAtual,
    LocalDateTime dataCriacao,
    LocalDateTime dataModificacao,
    Status status,
    String urlFoto
) {}
