package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

import samumene.erp_template.enumeration.Status;

public record CategoriaInsumoResponse(
    Long id,
    String nome,
    LocalDateTime dataCriacao,
    LocalDateTime dataModificacao,
    Status status 
) {}
