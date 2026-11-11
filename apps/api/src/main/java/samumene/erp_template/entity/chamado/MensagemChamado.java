package samumene.erp_template.entity.chamado;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.entity.Usuario;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.envers.Audited;

@Audited
@Getter @Setter
@Entity
@SQLDelete (sql = "UPDATE mensagem_chamado SET excluido = true WHERE id = ?")
public class MensagemChamado extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Usuario autor;

    @ManyToOne
    private Chamado chamado;

    private String mensagem;

}
