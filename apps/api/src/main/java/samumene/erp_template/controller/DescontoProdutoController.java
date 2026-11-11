package samumene.erp_template.controller;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.desconto.DescontoProdutoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoProdutoEditRequest;
import samumene.erp_template.dto.response.DescontoProdutoResponse;
import samumene.erp_template.service.DescontoProdutoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/desconto-produto")
public class DescontoProdutoController {
    // Dependências
    private final DescontoProdutoService descontoProdutoService;

    // Injeção de Dependêcias
    public DescontoProdutoController(DescontoProdutoService descontoProdutoService) {
        this.descontoProdutoService = descontoProdutoService;
    }

    /**
     * Cria um novo desconto desse produto.
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid DescontoProdutoCreateRequest request) {
        this.descontoProdutoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Lista todos os descontos específicos desse produto.
     * @param idProduto Id único do produto.
     */
    @GetMapping("/{idProduto}/findAll")
    public ResponseEntity<List<DescontoProdutoResponse>> findAll(@PathVariable Long idProduto) {
        var response = this.descontoProdutoService.findAll(idProduto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Realiza modificações em um desconto já existente
     * @param id Id do desconto.
     * @param request Objeto de requisição.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(
            @PathVariable Long id,
            @RequestBody @Valid DescontoProdutoEditRequest request
    ) {
        this.descontoProdutoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Exclui um desconto de um produto pelo Id
     * @param id Id do desconto.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.descontoProdutoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
