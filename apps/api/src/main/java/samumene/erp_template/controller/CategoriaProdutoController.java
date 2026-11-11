package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.produto.CategoriaProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.CategoriaProdutoEditRequest;
import samumene.erp_template.dto.response.CategoriaProdutoResponse;
import samumene.erp_template.filter.CategoriaProdutoFindAllFilter;
import samumene.erp_template.service.CategoriaProdutoService;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto/categoria")
public class CategoriaProdutoController {
    // Dependências
    private final CategoriaProdutoService categoriaProdutoService;

    // Injeção de dependências
    public CategoriaProdutoController(CategoriaProdutoService categoriaProdutoService) {
        this.categoriaProdutoService = categoriaProdutoService;
    }

    /**
     *  Criação de uma nova categoria de produtos.
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid CategoriaProdutoCreateRequest request) {
        this.categoriaProdutoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Busca todas as categorias de produtos cadastradas no sistema.
     * @param pageable Objeto com as configuração da paginação, definido nos queryParams.
     * @return Um {@link Page} das categorias cadastradas.
     */
    @GetMapping("/findAll")
    public ResponseEntity<Page<CategoriaProdutoResponse>> findAll(
            @ParameterObject
            @PageableDefault(sort = "dataModificacao") Pageable pageable,
            @ParameterObject CategoriaProdutoFindAllFilter filter
            ) {
        var lista = this.categoriaProdutoService.findAll(filter, pageable);
        return ResponseEntity.ok(lista);
    }

    /**
     * Edita uma categoria de produtos.
     * @param id Id da categoria.
     * @param request Objeto de requisição.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid CategoriaProdutoEditRequest request
    ) {
        this.categoriaProdutoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.categoriaProdutoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
