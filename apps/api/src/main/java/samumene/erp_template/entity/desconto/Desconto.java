package samumene.erp_template.entity.desconto;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.enumeration.ETipoValorDesconto;
import samumene.erp_template.enumeration.Status;

import org.hibernate.envers.Audited;

/**
 * 
 * Classe abstrata com atributos que os descontos possuem.
 */
@Audited
@Getter @Setter
@MappedSuperclass
public abstract class Desconto extends Auditable {
    /**
     * Id unico do desconto.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Nome do desconto.
     */
    private String nome;
    /**
     * Valor do desconto.
     */
    private Double valor;
    /**
     * Tipo da unidado do valor do desconto
     * Ex: Porcentagem, real etc.
     * @see ETipoValorDesconto
     */
    @Enumerated(EnumType.STRING)
    private ETipoValorDesconto tipoValor;

    /**
     * Status de visibilidade do desconto.
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;
}
