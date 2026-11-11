package samumene.erp_template.controller;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.insumo.CategoriaInsumoCreateRequest;
import samumene.erp_template.dto.request.insumo.CategoriaInsumoEditRequest;
import samumene.erp_template.dto.response.CategoriaInsumoResponse;
import samumene.erp_template.filter.CategoriaInsumoFindAllFilter;
import samumene.erp_template.service.CategoriaInsumoService;

@RestController
@RequestMapping("/insumo/categoria")
public class CategoriaInsumoController {

    // Dependências
    private final CategoriaInsumoService categoriaInsumoService;
    
    // Injeção de dependências
    public CategoriaInsumoController(CategoriaInsumoService categoriaInsumoService) {
        this.categoriaInsumoService = categoriaInsumoService;
    }

    /**
     * Cria uma nova categoria de insumos.
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@Valid @RequestBody  CategoriaInsumoCreateRequest request) {
        this.categoriaInsumoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Retorna a lista paginada das categorias de insumos cadastradas no sistema.
     * @param pageable Objeto com as configuração da paginação, definido nos queryParams.
     * @return Uma {@link Page} com as categorias de insumos cadastradas.
     */
    @GetMapping("/findAll")
    public ResponseEntity<Page<CategoriaInsumoResponse>> findAll(
            @ParameterObject
            @PageableDefault(sort = "dataModificacao") Pageable pageable,
            @ParameterObject CategoriaInsumoFindAllFilter filter
            ) {
        var list = this.categoriaInsumoService.findAll(filter, pageable);
        return ResponseEntity.ok(list);
    }

    /**
     * Altera as propriedades de uma categoria de insumos.
     * @param id Id da categoria.
     * @param request Objeto de requisição com os campos alterados.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
        @PathVariable Long id, 
        @RequestBody @Valid CategoriaInsumoEditRequest request
    ){
        this.categoriaInsumoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Exclui do sistema uma categoria de insumos.
     * @param id Id da categoria.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.categoriaInsumoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
