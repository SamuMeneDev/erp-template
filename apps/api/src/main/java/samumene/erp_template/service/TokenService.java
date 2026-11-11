package samumene.erp_template.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import samumene.erp_template.dto.request.usuario.UsuarioPasswordEditRequest;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.NoSuchElementException;

/**
 * Serviço de geração e validação de tokens.
 */
@Service
public class TokenService {

    // Dependências
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final Environment environment;

    /**
     * Secret para composição e resolução dos tokens.
     */
    @Value("${api.security.token.secret}")
    private String secret;

    // Injeção de dependências
    public TokenService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder, Environment environment) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.environment = environment;
    }

    /**
     * Duração que um token permanece válido.
     */
    public static Duration expireTimeProd = Duration.ofHours(24);

    /**
     * Duração que um token permanece válido.
     */
    public static Duration expireTimeDev = Duration.ofHours(2);



    /**
     * Metodo que gera novos tokens de acesso.
     *
     * @param usuario Objeto do usuário que requisita o token.
     * @return Retorna o token gerado.
     */
    public String generateToken(Usuario usuario) {
        // Verifica se está sendo executado em produção, para configurar o cookie
        boolean isProd = Arrays.asList(environment.getActiveProfiles()).contains("prod");

        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withIssuer("erp-template")
                .withClaim("roles", usuario.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .withSubject(usuario.getEmail())
                .withExpiresAt(Instant.now().plus(isProd?expireTimeProd:expireTimeDev))
                .sign(algorithm);
    }

    /**
     * Valida um token gerado anteriormente no sistema.
     *
     * @param token Valor do token a ser validado.
     * @return Se o token for válido, retorna o subject (email) do usuário,
     * caso contrário, retorna um string vazia {@code ""}
     */
    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.require(algorithm)
                    .withIssuer("erp-template")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return "";
        }
    }

    /**
     * Estratégia de solicitação de redefinição de senha usada pelo administrador do sistema.
     * @param request Senha provisória para o usuario se autenticar.
     * @param idUsuario ID do usuário que terá a senha alterada.
     */
    public void solicitarRedefinicaoSenha(UsuarioPasswordEditRequest request, Long idUsuario) {
        Usuario usuario = this.usuarioRepository.findById(idUsuario)
            .orElseThrow(()->new NoSuchElementException("Usuário não encontrado"));

        usuario.setSenha(this.passwordEncoder.encode(request.senha()));
        usuario.setMudarSenha(true);

        this.usuarioRepository.save(usuario);
    }
}
