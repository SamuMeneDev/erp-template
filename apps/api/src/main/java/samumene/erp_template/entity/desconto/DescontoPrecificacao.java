package samumene.erp_template.entity.desconto;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.Precificacao;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * Entidade que representa os descontos aplicados a uma precificação específica.
 * Caso o atributo plataforma seja {@code null}, O desconto é aplicado a todos as precificações.
 */
@Audited
@Entity 
@Getter @Setter 
@NoArgsConstructor
@SQLDelete(sql = "UPDATE desconto_precificacao SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class DescontoPrecificacao extends Desconto {
    
    /**
     * Representa qual precificação esse desconto será aplicado.
     * @apiNote caso seja {@code null}, O desconto deve ser aplicado a todos as precificações.
     */
    @ManyToOne
    private Precificacao precificacao;
}
