package samumene.erp_template.dto.response;

public record ComponenteResponse(
        Long id,
        InsumoResponse insumo,
        Integer quantidade
) {}
