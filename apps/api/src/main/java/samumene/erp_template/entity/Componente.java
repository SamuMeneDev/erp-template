package samumene.erp_template.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.insumo.Insumo;
import samumene.erp_template.entity.produto.Produto;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * Item que compõem um produto, um insumo e sua quantidade
 */
@Entity
@Audited
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE componente SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false")
public class Componente extends Auditable {
    /**
     * Id do componente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Produto da composição.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Produto produto;
    /**
     * Insumo que compõe o produto.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Insumo insumo;
    /**
     * Quantidade do insumo usada no produto.
     */
    private Integer quantidade;

    // Construtores
    public Componente(Insumo insumo, Integer quantidade, Produto produto) {
        super();
        this.insumo = insumo;
        this.quantidade = quantidade;
        this.produto = produto;
    }
}
