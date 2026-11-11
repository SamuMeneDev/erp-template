package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.produto.ProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.ProdutoEditRequest;
import samumene.erp_template.dto.response.ProdutoResponse;
import samumene.erp_template.filter.ProdutoFindAllFilter;
import samumene.erp_template.service.ProdutoService;

import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    // Dependências
    private final ProdutoService produtoService;

    // Injeção de dependências
    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    /**
     * Cria um novo produto no sistema.
     *
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid ProdutoCreateRequest request) {
        this.produtoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Lista páginada com todos os produtos cadastrados no sistema.
     * @param pageable Objeto com configurações de paginação, é definido nos queryParams.
     * @return {@link Page} de Produtos
     */
    @GetMapping("/findAll")
    public ResponseEntity<Page<ProdutoResponse>> findAll(
            @ParameterObject
            @PageableDefault(sort = "codigo")
            Pageable pageable,
            @ParameterObject ProdutoFindAllFilter filter
    ) {
        var lista = this.produtoService.findAll(filter, pageable);
        return ResponseEntity.ok(lista);
    }

    /**
     * Edita os atributos de um produto já cadastrado.
     *
     * @param id Id do produto.
     * @param request Objeto de requisição.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid ProdutoEditRequest request
    ) {
        this.produtoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Exclui um produto do sistema.
     * @param id Id do produto.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.produtoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
