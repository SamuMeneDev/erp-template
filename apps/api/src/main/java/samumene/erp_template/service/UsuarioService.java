package samumene.erp_template.service;

import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.usuario.UsuarioEditRequest;
import samumene.erp_template.dto.request.usuario.UsuarioLoginRequest;
import samumene.erp_template.dto.request.usuario.UsuarioPasswordEditRequest;
import samumene.erp_template.dto.request.usuario.UsuarioRegisterRequest;
import samumene.erp_template.dto.response.TokenResponse;
import samumene.erp_template.dto.response.UsuarioResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.enumeration.UsuarioRoles;
import samumene.erp_template.mapper.UsuarioMapper;
import samumene.erp_template.repository.UsuarioRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

/**
 * Implementação das regras de negócio do usuário.
 */
@Service
public class UsuarioService implements UserDetailsService {
    // Depencências
    private final UsuarioRepository usuarioRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioMapper usuarioMapper;

    // Injeção de dependências
    public UsuarioService(UsuarioRepository usuarioRepository, @Lazy AuthenticationManager authenticationManager,
            TokenService tokenService, PasswordEncoder passwordEncoder, UsuarioMapper usuarioMapper) {
        this.usuarioRepository = usuarioRepository;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.usuarioMapper = usuarioMapper;
    }


    // Métodos
    /**
     * Faz a autenticação de usuário ja cadastrado no sistema.
     *
     * @param request Objeto de requisição.
     * @return Retorna um objeto com dados do login e o token de acesso.
     */
    public TokenResponse login(UsuarioLoginRequest request) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(request.email(), request.senha());

        var auth = this.authenticationManager.authenticate(usernamePassword);
        return TokenResponse.generate(
                request.email(),
                tokenService.generateToken((Usuario) Objects.requireNonNull(auth.getPrincipal())),
                ((Usuario) Objects.requireNonNull(auth.getPrincipal())).getId()
        );
    }

    /**
     * Cadastro de um novo usuário no sistema.
     *
     * @param request Objeto de requisição.
     */
    public void register(UsuarioRegisterRequest request) {
        if(this.usuarioRepository.existsByEmail(request.email())) {
            throw  new IllegalArgumentException("Um usuário com esse email já foi cadastrado");
        }
        Usuario usuario = new Usuario();

        usuario.setSenha(this.passwordEncoder.encode(request.senha()));
        usuario.setNome(request.nome());
        usuario.setEmail(request.email());
        usuario.setRole(UsuarioRoles.valueOf(request.role()));

        usuario.setDataModificacao(usuario.getDataCriacao());
        this.usuarioRepository.save(usuario);
    }

    /**
     * Busca um usuário cadastrado pelo seu ID.
     *
     * @param id Id do usuário.
     * @return Retorna um {@link UsuarioResponse} do usuario encontrado.
     */
    public UsuarioResponse findById(Long id) {
        return this.usuarioMapper.getParser(this.usuarioRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Usuário não encontrado")));
    }

    /**
     * Realiza edição nos dados da conta do usuário.
     *
     * @param request Objeto de requisição.
     * @param usuario Refere
     */
    public void edit(UsuarioEditRequest request, Usuario usuario) {
        // Realiza alterações da request para a entidade
        this.usuarioMapper.patchParser(request, usuario);

        this.usuarioRepository.save(usuario);
    }

    /**
     * Obtem os dados do usuário autênticado.
     *
     * @param usuario Referência do usuário autênticado
     * @return DTO do usuario logado
     */
    public UsuarioResponse obterUsuarioLogado(Usuario usuario) {
        return this.usuarioMapper.getParser(usuario);
    }

    public List<UsuarioResponse> findAll() {
        return this.usuarioMapper
                .getEntityList(this.usuarioRepository.findAll());
    }

    public void alterarSenha(Long idUsuario, UsuarioPasswordEditRequest request) {
        Usuario usuario = this.usuarioRepository.findById(idUsuario)
            .orElseThrow(()->new NoSuchElementException("Usuário não encontrado"));

        if(usuario.isMudarSenha()) {
            usuario.setSenha(this.passwordEncoder.encode(request.senha()));
            usuario.setMudarSenha(false);
            
            this.usuarioRepository.save(usuario);
        }
    }

    // Implementações
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.usuarioRepository
                .findByEmail(username)
                .orElseThrow(()->new NoSuchElementException("Usuário não encontrado"));
    }
}
