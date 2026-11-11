package samumene.erp_template.dto.request.produto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProdutoCreateRequest(
    @NotBlank(message = "O nome é obrigatório")
    String nome,
    String codigo,
    @Size(max = 500, message = "Tamanho máximo de caracteres atingido")
    String descricao,
    Long categoriaId,
    Integer quantAtual,
    Integer quantMinima,
    Double markup,
    String urlFoto
) {}
