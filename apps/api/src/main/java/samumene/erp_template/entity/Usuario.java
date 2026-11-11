package samumene.erp_template.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.chamado.Chamado;
import samumene.erp_template.entity.chamado.MensagemChamado;
import samumene.erp_template.enumeration.UsuarioRoles;

import org.hibernate.envers.Audited;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Entidade que representa o utilizador primário do sistema.
 */
@Entity
@Audited
@Getter @Setter @NoArgsConstructor
public class Usuario extends Auditable implements UserDetails {
    /**
     * Identificador único do usuário no sistema.
     */
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * Nome do usuário.
     */
    @Column(nullable = false)
    private String nome;
    /**
     * Email do usuário.
     */
    @Column(nullable = false)
    private String email;
    /**
     * Senha do usuário.
     */
    @Column(nullable = false)
    private String senha;
    /**
     * Nível de autorização do usuário no sistema.
     * @see UsuarioRoles
     */
    @Enumerated(EnumType.STRING)
    private UsuarioRoles role = UsuarioRoles.USUARIO;

    @OneToMany(mappedBy = "autor")
    private List<Chamado> chamados;

    @OneToMany(mappedBy = "mensagem")
    private List<MensagemChamado> mensagens;

    
    private boolean mudarSenha = false;

    // UserDetails

    /**
     * Returns the authorities granted to the user. Cannot return <code>null</code>.
     *
     * @return the authorities, sorted by natural key (never <code>null</code>)
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(this.role);
    }

    /**
     * Returns the password used to authenticate the user. Can be null if the user has not
     * specified a password (e.g. the user Passkeys instead).
     *
     * @return the password
     */
    @Override
    public @Nullable String getPassword() {
        return this.getSenha();
    }
    /**
     * Returns the username used to authenticate the user. Cannot return
     * <code>null</code>.
     *
     * @return the username (never <code>null</code>)
     */
    @Override
    public String getUsername() {
        return this.getEmail();
    }
}
