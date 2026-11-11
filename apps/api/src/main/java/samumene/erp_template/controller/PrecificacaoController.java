package samumene.erp_template.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import samumene.erp_template.dto.request.precificacao.PrecificacaoCreateRequest;
import samumene.erp_template.dto.request.precificacao.PrecificacaoEditRequest;
import samumene.erp_template.dto.response.PrecificacaoResponse;
import samumene.erp_template.dto.response.PrecificacaoValorVendaResponse;
import samumene.erp_template.service.PrecificacaoService;
import samumene.erp_template.service.PrecoProdutoService;

import java.util.List;

@RestController
@RequestMapping("/precificacao")
public class PrecificacaoController {
    // Dependências
    private final PrecificacaoService precificacaoService;
    private final PrecoProdutoService precoProdutoService;

    // Injeção de dependências
    public PrecificacaoController(PrecificacaoService precificacaoService, PrecoProdutoService precoProdutoService) {
        this.precificacaoService = precificacaoService;
        this.precoProdutoService = precoProdutoService;
    }

    /**
     *  Realiza alterações em uma precificação já cadastrada.
     * @param id Id da precificação.
     * @param request Objeto de requisição.
     */
    @PatchMapping("/{id}")
    public ResponseEntity<Void> edit(@PathVariable Long id, @RequestBody @Valid PrecificacaoEditRequest request) {
        this.precificacaoService.edit(id, request);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Busca todas as precificações cadastradas no sistema.
     */
    @GetMapping("/findAll")
    public ResponseEntity<List<PrecificacaoResponse>> findAll() {
        var list = this.precificacaoService.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * Cria uma nova precificação no sistema.
     * @param request Objeto de requisição.
     */
    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody @Valid PrecificacaoCreateRequest request) {
        this.precificacaoService.create(request);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Exclui uma precificação do sistema.
     * @param id Id da precificação.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.precificacaoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Busca todos os valores aplicados para todas as precificações em um produto.
     * @param idProduto Id do produto.
     * @return Lista com os valore desse produto em todas as precificações.
     */
    @GetMapping("/valores/{idProduto}")
    public ResponseEntity<List<PrecificacaoValorVendaResponse>> findAllValoresProduto(@PathVariable Long idProduto) {
        var response = this.precoProdutoService.findAllPreco(idProduto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
