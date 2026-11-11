package samumene.erp_template.enumeration;

import org.springframework.security.core.GrantedAuthority;

public enum UsuarioRoles implements GrantedAuthority {
    USUARIO,
    ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
