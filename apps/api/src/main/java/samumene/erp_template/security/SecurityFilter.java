package samumene.erp_template.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.repository.UsuarioRepository;
import samumene.erp_template.service.TokenService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final UsuarioRepository usuarioRepository;

    public SecurityFilter(TokenService tokenService, UsuarioRepository usuarioRepository) {
        this.tokenService = tokenService;
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = this.recoverToken(request);

        if(token != null) {
            String login = tokenService.validateToken(token);
            if(login != null && !login.isEmpty()) {
                Optional<Usuario> userOpt = this.usuarioRepository.findByEmail(login);

                if(userOpt.isPresent()) {
                    Usuario user = userOpt.get();
                    var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    /**
     * Tenta buscar o token usando diferentes estratégias de extração.
     * @param request Requisição HTTP
     * @return Retorna o token caso encontrado
     */
    private String recoverToken(HttpServletRequest request) {
        
        // Estrategia Header
        if(request.getHeader("Authorization") != null) {
            return request.getHeader("Authorization").replace("Bearer ", "");
        // Estrategia Cookie
        } else if(request.getCookies() != null) {
            for(Cookie cookie : request.getCookies()) {
                if("auth_token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
