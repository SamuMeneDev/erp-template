package samumene.erp_template.controller;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import samumene.erp_template.dto.request.chamado.MensagemChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.MensagemChamadoEditRequest;
import samumene.erp_template.dto.response.MensagemChamadoResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.service.MensagemChamadoService;

@RestController 
@RequestMapping("/chamado/mensagem")
public class MensagemChamadoController {

    private final MensagemChamadoService mensagemChamadoService;
    
    public MensagemChamadoController(MensagemChamadoService mensagemChamadoService) {
        this.mensagemChamadoService = mensagemChamadoService;
    }

    @PostMapping("/{id}/send")
    public ResponseEntity<Void> send(
        @PathVariable Long id,
        @RequestBody @Valid MensagemChamadoCreateRequest request,
        @PageableDefault @ParameterObject Pageable pageable,
        @AuthenticationPrincipal Usuario usuario
    ) {
        this.mensagemChamadoService.create(id, request, usuario);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{idChamado}/findAll")
    public ResponseEntity<Page<MensagemChamadoResponse>> findAllCommentsByChamado(
        @PathVariable Long idChamado,
        @PageableDefault @ParameterObject Pageable pageable
    ) {
        var response = this.mensagemChamadoService.findAllByChamado(idChamado, pageable);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<Void> edit(
        @PathVariable  Long id,
        @RequestBody @Valid MensagemChamadoEditRequest request
    ) {
        this.mensagemChamadoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.mensagemChamadoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
