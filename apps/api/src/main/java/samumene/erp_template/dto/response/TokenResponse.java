package samumene.erp_template.dto.response;

import java.time.LocalDateTime;

/**
 * DTO de resposta para uma autenticação validada no login.
 * @param email Email do usuário que se autenticou.
 * @param timestamp Data de Emissão do token.
 * @param token Token JWT para autorização nas requisições.
 */
public record TokenResponse(
        String email,
        LocalDateTime timestamp,
        String token,
        Long id
) {
    /**
     * Cria uma instância do {@link TokenResponse} apenas passando o email e o token.
     *
     * @param email Email do usuário.
     * @param token Token JWT do usuário.
     * @return Um novo DTO {@link TokenResponse}.
     */
    public static TokenResponse generate(String email, String token, Long usuarioId) {
        return new TokenResponse(email, LocalDateTime.now(), token, usuarioId);
    }
}
