package samumene.erp_template.controller;


import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.insumo.InsumoCreateRequest;
import samumene.erp_template.dto.request.insumo.InsumoEditRequest;
import samumene.erp_template.dto.response.InsumoResponse;
import samumene.erp_template.filter.InsumoFindAllFilter;
import samumene.erp_template.service.InsumoService;

@RestController
@RequestMapping("/insumo")
public class InsumoController {
    // Dependências
    private final InsumoService insumoService;

    // Injeção de dependências
    public InsumoController(InsumoService insumoService) {
        this.insumoService = insumoService;
    }

    /**
     * Insere um novo insumo no sistema.
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid InsumoCreateRequest request) {
        this.insumoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Lista paginada com todos os insumos cadastrados no sistema.
     * @param pageable Objeto com as configuração da paginação, definido nos queryParams.
     */
    @GetMapping("/findAll")
    public ResponseEntity<Page<InsumoResponse>> findAll(
            @ParameterObject
            @PageableDefault(sort = "dataModificacao") Pageable pageable,
            @ParameterObject InsumoFindAllFilter filter
            ) {
        var lista = this.insumoService.findAll(filter, pageable);
        return ResponseEntity.ok(lista);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid InsumoEditRequest request
    ) {
        this.insumoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.insumoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
