package samumene.erp_template.entity.insumo;


import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.enumeration.Status;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

@Entity
@Audited
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE insumo SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class Insumo extends Auditable {
    /**
     * Id do insumo.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome do insumo.
     */
    private String nome;

    /**
     * Preço do insumo.
     */
    private Double preco;

    /**
     * Categoria do insumo.
     */
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private CategoriaInsumo categoria;

    /**
     * Quantidade mínima que deve ter no estoque para este insumo.
     */
    @Transient
    private Integer quantMinima = 0;

    /**
     * Quantidade atual desse insumo no estoque.
     */
    private Integer quantAtual = 0;

    private String urlFoto;

    /**
     * Status do insumo.
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;

    // Relacionamentos

    @OneToMany(mappedBy = "insumo", cascade = CascadeType.REMOVE)
    @JsonIgnore
    @SQLRestriction("excluido = false AND EXISTS (SELECT 1 FROM produto p WHERE p.id = produto_id AND p.excluido = false)")
    private List<Componente> componentes;
}
