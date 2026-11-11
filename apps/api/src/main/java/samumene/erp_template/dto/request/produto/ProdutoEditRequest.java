package samumene.erp_template.dto.request.produto;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import samumene.erp_template.enumeration.Status;


public record ProdutoEditRequest(
        @Size(min = 3, message = "O nome deve ter no mínimo 3 caracteres")
        String nome,
        String codigo,
        @Size(max = 500, message = "Tamanho máximo de caracteres atingido")
        String descricao,
        Long categoriaId,
        @Pattern(regexp = Status.statusRegExp, message = "Status inválido")
        String status,
        Double markup,
        Integer quantMinima,
        Integer quantAtual,
        String urlFoto
) {}
