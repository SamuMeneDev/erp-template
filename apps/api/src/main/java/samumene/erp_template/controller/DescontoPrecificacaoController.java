package samumene.erp_template.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoEditRequest;
import samumene.erp_template.dto.response.DescontoPrecificacaoResponse;
import samumene.erp_template.service.DescontoPrecificacaoService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/desconto-precificacao")
public class DescontoPrecificacaoController {
    // Dependências
    private final DescontoPrecificacaoService descontoPrecificacaoService;

    // Injeção de dependências
    public DescontoPrecificacaoController(DescontoPrecificacaoService descontoPrecificacaoService) {
        this.descontoPrecificacaoService = descontoPrecificacaoService;
    }

    /**
     * Cria um desconto para uma precificação
     * @param request Objeto de requisição.
     * @apiNote Caso o atributo {@code idPrecificacao} for {@code null}, o desconto será aplicado à
     * todas as precificações.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> createDesconto(@RequestBody @Valid DescontoPrecificacaoCreateRequest request) {
        this.descontoPrecificacaoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Busca todas os descontos vinculados à uma precificação.
     * @param idPrecificacao Id da precificação.
     * @return {@link List} com os descontos da precificação e os globais.
     */
    @GetMapping("/{idPrecificacao}/findAll")
    public ResponseEntity<List<DescontoPrecificacaoResponse>> findAllDesconto(@PathVariable Long idPrecificacao) {
        var response = this.descontoPrecificacaoService.findAll(idPrecificacao);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/global/findAll")
    public ResponseEntity<List<DescontoPrecificacaoResponse>> findAllGlobal() {
        var response = this.descontoPrecificacaoService.findAllGlobal();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Edita os dados de um desconto da precificação (ou global) já cadastrados.
     * @param id Id do desconto.
     * @param request Objeto de requisição.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid DescontoPrecificacaoEditRequest request
    ) {
        this.descontoPrecificacaoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Exclui um desconto já criado no sistema.
     * @param id Id do desconto.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.descontoPrecificacaoService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
