package samumene.erp_template.dto.request.produto;

import jakarta.validation.constraints.NotEmpty;

public record CategoriaProdutoCreateRequest(
        @NotEmpty(message = "O nome é obrigatório")
        String nome
) {}
