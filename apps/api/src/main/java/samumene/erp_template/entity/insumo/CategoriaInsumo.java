package samumene.erp_template.entity.insumo;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.enumeration.Status;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * Categoria de insumos.
 */
@Entity
@Audited
@Getter @Setter 
@NoArgsConstructor
@SQLDelete(sql = "UPDATE categoria_insumo SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class CategoriaInsumo extends Auditable {
    /**
     * Id unico da categoria.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Nome da categoria.
     */
    @Column(nullable = false)
    private String nome;

    /**
     * Status da categoria.
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;

    // Relacionamentos

    @JsonIgnore
    @OneToMany(mappedBy = "categoria")
    private List<Insumo> insumos;
}
