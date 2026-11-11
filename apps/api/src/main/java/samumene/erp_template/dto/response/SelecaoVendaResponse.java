package samumene.erp_template.dto.response;

public record SelecaoVendaResponse(
        Long id,
        Integer quantidade,
        ProdutoResponse produto
) {}
