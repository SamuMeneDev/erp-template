package samumene.erp_template.entity;

import java.util.List;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.desconto.DescontoPrecificacao;
import samumene.erp_template.enumeration.Status;

/**
 * Classe que representa uma regra de precificação de um canal de venda, plataforma etc.
 * Contém seus próprios descontos a serem aplicados a os produtos relacionados.
 */
@Audited 
@Entity 
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE precificacao SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class Precificacao extends Auditable {
    /**
     * Identificador único dessa entidade.
     */
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome da precificação.
     */
    @Column(nullable = false)
    private String nome;

    /**
     * Status dessa precificação, se está ativa ou não etc.
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;


    // Relacionamentos

    /**
     * Descontos que serão aplicados a formula dessa precificação.
     */
    @OneToMany(mappedBy = "precificacao")
    private List<DescontoPrecificacao> descontos;

    @OneToMany(mappedBy = "precificacao")
    private List<Venda> vendas;
}
