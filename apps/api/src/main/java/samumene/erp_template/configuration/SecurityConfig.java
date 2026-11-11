package samumene.erp_template.configuration;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import jakarta.servlet.DispatcherType;
import samumene.erp_template.enumeration.UsuarioRoles;
import samumene.erp_template.security.SecurityFilter;

import java.util.Arrays;

/**
 * Configurações de segurança e autorizações da API.
 */
@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final SecurityFilter securityFilter;
    private final HandlerExceptionResolver resolver;
    private final Environment environment;
    
    public SecurityConfig(SecurityFilter securityFilter, @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver, Environment environment) {
        this.securityFilter = securityFilter;
        this.resolver = resolver;
        this.environment = environment;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
            .cors(cors-> cors.configure(http))
            .csrf(csrf->csrf.disable())
            .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authorize-> {
                authorize.requestMatchers("/usuario/login").permitAll()
                .dispatcherTypeMatchers(DispatcherType.ERROR).permitAll()
                .requestMatchers("/usuario/solicitar-redefinicao").permitAll()
                .requestMatchers("/usuario/alterar-senha/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll();
                
                // Permite o H2Console APENAS em abiente de desenvolvimento
                if(Arrays.asList(environment.getActiveProfiles()).contains("dev")) {
                    authorize.requestMatchers("/h2-console/**").permitAll();
                }

                
                authorize.requestMatchers("/usuario/register").hasAuthority(UsuarioRoles.ADMIN.name())
                .requestMatchers("/chamado/categoria").hasAuthority(UsuarioRoles.ADMIN.name())
                .requestMatchers("/admin/**").hasAuthority(UsuarioRoles.ADMIN.name())
                .requestMatchers("/usuario/me").authenticated()
                
                .anyRequest().authenticated();
            })
            .headers(headers -> headers
                    .frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
            )
            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint((request, response, authException) ->
                            resolver.resolveException(request, response, null, authException)
                    )
            )
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
