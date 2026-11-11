package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.chamado.ChamadoStatusEditRequest;
import samumene.erp_template.dto.request.usuario.UsuarioPasswordEditRequest;
import samumene.erp_template.dto.request.usuario.UsuarioRegisterRequest;
import samumene.erp_template.dto.response.ChamadoResponse;
import samumene.erp_template.dto.response.UsuarioResponse;
import samumene.erp_template.service.ChamadoService;
import samumene.erp_template.service.TokenService;
import samumene.erp_template.service.UsuarioService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    // Dependências
    private final TokenService tokenService;
    private final UsuarioService usuarioService;
    private final ChamadoService chamadoService;

    // Injeção de dependências
    public AdminController(UsuarioService usuarioService, ChamadoService chamadoService, TokenService tokenService) {
        this.usuarioService = usuarioService;
        this.chamadoService = chamadoService;
        this.tokenService = tokenService;
    }

    /**
     * Busca todos os usuários cadastrados no sistema.
     */
    @GetMapping("/findAll-usuario")
    public ResponseEntity<List<UsuarioResponse>> findAllUsuarios() {
        var response = this.usuarioService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Cadastra um novo usuário no sistema.
     * @param request Objeto de requisição.
     */
    @PostMapping("/register-usuario")
    public ResponseEntity<Void> registerUsuario(@RequestBody @Valid UsuarioRegisterRequest request) {
        usuarioService.register(request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/findAll-chamado")
    public ResponseEntity<List<ChamadoResponse>> findAllChamado() {
        var response = this.chamadoService.findAll();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/status-chamado/{idChamado}")
    public ResponseEntity<Void> alterarStatusChamado(
        @PathVariable Long idChamado,
        @RequestBody @Valid ChamadoStatusEditRequest request
    ) {
        this.chamadoService.alterarStatusChamado(idChamado, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/redefinir-acesso/{idUsuario}")
    public ResponseEntity<Void> redefinirAcesso(@PathVariable Long idUsuario, @RequestBody @Valid UsuarioPasswordEditRequest request) {
        this.tokenService.solicitarRedefinicaoSenha(request, idUsuario);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}
