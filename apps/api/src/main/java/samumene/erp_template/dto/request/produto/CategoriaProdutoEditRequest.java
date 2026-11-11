package samumene.erp_template.dto.request.produto;

import jakarta.validation.constraints.NotEmpty;

public record CategoriaProdutoEditRequest(
        @NotEmpty(message = "O nome é obrigatório")
        String nome
) {}
