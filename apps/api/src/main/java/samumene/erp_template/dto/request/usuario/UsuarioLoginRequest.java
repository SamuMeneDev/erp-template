package samumene.erp_template.dto.request.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * DTO de requisição para login no sistema.
 * @param email Email do usuário.
 * @param senha Senha do usuário.
 */
public record UsuarioLoginRequest(
        @NotNull(message = "O email é obrigatório")
        @Email(message = "Insira um email válido")
        String email,
        @Size(min = 6, message = "A senha deve conter no mínimo 6 caracteres")
        @NotNull(message = "A senha é obrigatória")
        String senha
) {}
