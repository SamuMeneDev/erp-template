package samumene.erp_template.entity.produto;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.enumeration.Status;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * 
 * Entidade que representa a categoria de um produto.
 */
@Entity
@Audited
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE categoria_produto SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class CategoriaProduto extends Auditable{
    /**
     * Id único da categoria do produto.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Nome da categoria.
     */
    private String nome;

    /**
     * Status da categoria.
     * @see Status
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;

    // Relacionamento
    @JsonIgnore
    @OneToMany(mappedBy = "categoria")
    private List<Produto> produtos;
}
