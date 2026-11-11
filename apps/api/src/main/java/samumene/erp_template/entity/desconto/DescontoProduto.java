package samumene.erp_template.entity.desconto;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.produto.Produto;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;


/**
 * Entidade que representa descontos aplicados
 * individualmente nos produtos.
 */
@Entity
@Audited
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE desconto_produto SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class DescontoProduto extends Desconto {
    /**
     * Represemta a qual produto esse desconto será aplicadp.
     */
    @ManyToOne
    private Produto produto;
}
