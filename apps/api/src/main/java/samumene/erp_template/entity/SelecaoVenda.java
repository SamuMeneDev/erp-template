package samumene.erp_template.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.produto.Produto;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * Entidade que faz a associação entre produtos e uma venda.
 * É usada para computar a quantidade que um produto foi vendido.
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@Audited
@SQLDelete(sql = "UPDATE selecao_venda SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false")
public class SelecaoVenda extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer quantidade;

    // Relacionamentos

    @ManyToOne
    private Produto produto;

    @ManyToOne
    private Venda venda;

}
