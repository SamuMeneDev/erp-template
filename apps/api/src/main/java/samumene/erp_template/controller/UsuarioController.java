package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.usuario.UsuarioEditRequest;
import samumene.erp_template.dto.request.usuario.UsuarioLoginRequest;
import samumene.erp_template.dto.request.usuario.UsuarioPasswordEditRequest;
import samumene.erp_template.dto.response.TokenResponse;
import samumene.erp_template.dto.response.UsuarioResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.service.TokenService;
import samumene.erp_template.service.UsuarioService;

import java.util.Arrays;

import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * Controller que gerencia as requisições relacionadas à acesso, cadastro e redefinições dos usuários.
 */
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    // Dependências
    private final UsuarioService usuarioService;
    private final Environment environment;

    // Injeção de Dependência
    public UsuarioController(UsuarioService usuarioService, Environment environment) {
        this.usuarioService = usuarioService;
        this.environment = environment;
    }

    // Métodos
    /**
     * Faz autenticação do usuário no sistema.
     *
     * @param request Objeto de requisição.
     * @return Retorna um {@link TokenResponse} com o dados de acesso e token.
     */
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody @Valid UsuarioLoginRequest request) {
        // Verifica se está sendo executado em produção, para configurar o cookie
        boolean isProd = Arrays.asList(environment.getActiveProfiles()).contains("prod");

        var response = this.usuarioService.login(request);
        var cookie = ResponseCookie.from("auth_token", response.token())
            .httpOnly(true)
            .secure(isProd) // Para HTTPS: true
            .path("/")
            .maxAge(isProd ? TokenService.expireTimeProd:TokenService.expireTimeDev)
            .sameSite(isProd ? "None":"Lax")
            .build();
        return ResponseEntity
        .ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body(response);
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // Verifica se está sendo executado em produção, para configurar o cookie
        boolean isProd = Arrays.asList(environment.getActiveProfiles()).contains("prod");

        var cookie = ResponseCookie.from("auth_token", "")
            .httpOnly(true)
            .secure(isProd) // Para HTTPS: true
            .path("/")
            .maxAge(0)
            .sameSite(isProd ? "None":"Lax")
            .build();
        return ResponseEntity
        .ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .build();
    }

    /**
     * Busca um usuário cadastrado pelo seu ID.
     *
     * @param id Id do usuário.
     * @return Retorna o usuário correspondente ao ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> findById(@PathVariable Long id) {
        var usuarioResponse = this.usuarioService.findById(id);
        return ResponseEntity.ok(usuarioResponse);
    }

    /**
     * Edita os dados do usuário autenticado no sistema.
     *
     * @param request Objeto de requisição.
     * @param usuario Referência do usuário autenticado.
     */
    @PatchMapping("/edit")
    public ResponseEntity<Void> edit(
            @RequestBody @Valid UsuarioEditRequest request,
            @AuthenticationPrincipal Usuario usuario
    ) {
        this.usuarioService.edit(request, usuario);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    /**
     * Retorna a o usuário logado autal.
     * @param usuario Referência do usuário autenticado.
     * @return Retorna DTO do usuario logado.
     */
    @GetMapping("/me")
    public ResponseEntity<?> obterUsuarioLogado(@AuthenticationPrincipal Usuario usuario) {
        var response = this.usuarioService.obterUsuarioLogado(usuario);
        // Retorne os dados do perfil do usuário (nome, permissões, etc.) sem o token
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/alterar-senha/{idUsuario}")
    public ResponseEntity<Void> alterarSenha(@PathVariable Long idUsuario, @RequestBody @Valid UsuarioPasswordEditRequest request) {
        this.usuarioService.alterarSenha(idUsuario, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
