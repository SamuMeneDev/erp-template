package samumene.erp_template.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.chamado.ChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.ChamadoEditRequest;
import samumene.erp_template.dto.response.ChamadoResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.service.ChamadoService;

@RequestMapping("/chamado")
@RestController 
public class ChamadoController {
    
    // Dependência
    private final ChamadoService chamadoService;

    // Injeção de dependência
    public ChamadoController(ChamadoService chamadoService) {
        this.chamadoService = chamadoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Void> create(
        @RequestBody @Valid ChamadoCreateRequest request,
        @AuthenticationPrincipal Usuario usuario
    ) {
        this.chamadoService.create(request, usuario);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Nesse método, é listado todos os chamados aberto pelo usuário autênticado.
     * @param usuario Referência do usuário autênticado.
     * @return {@link List} dos chamados abertos pelo usuário.
     */
    @GetMapping("/findAll")
    public ResponseEntity<List<ChamadoResponse>> findAll(@AuthenticationPrincipal Usuario usuario) {
        var response = this.chamadoService.findAll(usuario);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody @Valid ChamadoEditRequest request) {
        this.chamadoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.chamadoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
