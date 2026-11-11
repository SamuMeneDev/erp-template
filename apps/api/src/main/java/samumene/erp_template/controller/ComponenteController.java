package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.componente.ComponenteCreateRequest;
import samumene.erp_template.dto.request.componente.ComponenteEditRequest;
import samumene.erp_template.service.ComponenteService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller que gerencia as ações relacionadas a entidade associativa entre insumo e produto,
 * cuja indica quais os insumos que um produto tem e quantidades necessárias.
 *
 */
@RestController
@RequestMapping("/produto/componente")
public class ComponenteController {

    // Dependências
    private final ComponenteService componenteService;

    // Injeção de dependências
    public ComponenteController(ComponenteService componenteService) {
        this.componenteService = componenteService;
    }

    /**
     * Vincula um insumo a um produto por meio de um componente, adicionando também a quantidade necessária desse insumo
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid ComponenteCreateRequest request) {
        this.componenteService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Edita um componente já adicionado
     *
     * @param request Objeto de requisição.
     * @param id Id do componente no sistema.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid ComponenteEditRequest request
    ) {
        this.componenteService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Exclui um componente de um produto.
     * @param id Id do componente.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.componenteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
