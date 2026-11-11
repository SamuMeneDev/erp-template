package samumene.erp_template.entity.chamado;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

import java.util.List;

@Entity
@Getter @Setter
@Audited
@SQLDelete(sql = "UPDATE categoria_chamado SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false")
public class CategoriaChamado extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Short urgencia;

    @OneToMany(mappedBy = "categoria")
    private List<Chamado> chamados;

}
