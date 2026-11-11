package samumene.erp_template.dto.request.usuario;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioPasswordEditRequest(
        @Size(min = 6, message = "A senha deve conter no mínimo 6 caracteres")
        @NotNull(message = "A senha é obrigatória")
        String senha
) {}
