package samumene.erp_template.entity.chamado;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.enumeration.StatusChamado;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@Audited
@SQLDelete (sql = "UPDATE chamado SET excluido = true WHERE id = ?")
@SQLRestriction ("excluido = false")
public class Chamado extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario autor;

    @ManyToOne
    private CategoriaChamado categoria;

    private String titulo;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusChamado status;

    @OneToMany(mappedBy = "chamado")
    private List<MensagemChamado> mensagens = new ArrayList<>();
}
