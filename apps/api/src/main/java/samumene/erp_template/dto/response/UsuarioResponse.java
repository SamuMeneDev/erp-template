package samumene.erp_template.dto.response;

import samumene.erp_template.enumeration.UsuarioRoles;

public record UsuarioResponse(
        Long id,
        String nome,
        UsuarioRoles role,
        boolean mudarSenha
) {}
