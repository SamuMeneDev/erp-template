package samumene.erp_template.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import samumene.erp_template.enumeration.Status;

public record ProdutoResponse(
    Long id,
    String nome,
    String codigo,
    String descricao,
    CategoriaProdutoResponse categoria,
    List<ComponenteResponse> componentes,
    Double valorVenda,
    Double custoMaterial,
    Status status,
    Integer quantAtual,
    Integer quantMinima,
    LocalDateTime dataCriacao,
    Double markup,
    LocalDateTime dataModificacao,
    String urlFoto

) {}
