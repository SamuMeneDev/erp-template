package samumene.erp_template.dto.request.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO para registrar novos usuários no sistema.
 */
public record UsuarioRegisterRequest(
        @NotBlank(message = "O nome é obrigatório.")
        String nome,
        @Email(message = "Insira um email válido.")
        String email,
        @Size(min = 6, message = "A senha deve conter no mínim0 6 caracteres.")
        String senha,
        String role
) {}
