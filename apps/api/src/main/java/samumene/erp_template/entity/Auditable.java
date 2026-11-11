package samumene.erp_template.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Classe que automatiza os registros de modificações e criação
 * @apiNote Os campos {@code revtype} das classes com o sufixo _AUD seguem o seguinte padrão:
 * 0 -> inserção
 * 1 -> edição
 * 2 -> remoção
 */
@Getter @Setter
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {
    @CreatedBy
    @Column(updatable = false)
    private String criadoPor;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime dataCriacao;

    @LastModifiedBy
    private String modificadorPor;

    @LastModifiedDate
    private LocalDateTime dataModificacao;

    @Column(nullable = false)
    private boolean excluido = false;
}
