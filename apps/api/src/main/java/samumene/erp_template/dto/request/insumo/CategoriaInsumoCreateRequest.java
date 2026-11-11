package samumene.erp_template.dto.request.insumo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record CategoriaInsumoCreateRequest(
    @NotEmpty(message = "O nome é obrigatório")
    @Size(min = 3, message = "O nome da categoria deve ter no mínimo 3 caracteres")
    String nome
) {}
