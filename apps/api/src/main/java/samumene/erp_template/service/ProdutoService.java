package samumene.erp_template.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import samumene.erp_template.dto.request.produto.ProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.ProdutoEditRequest;
import samumene.erp_template.dto.response.ProdutoResponse;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.filter.FilterExecutor;
import samumene.erp_template.mapper.ProdutoMapper;
import samumene.erp_template.repository.CategoriaProdutoRepository;
import samumene.erp_template.repository.ProdutoRepository;
import samumene.erp_template.service.domain.PricingCalculator;

import java.util.*;

@Service
public class ProdutoService {

    // Dependências
    private final ProdutoRepository produtoRepository;
    private final ProdutoMapper produtoMapper;
    private final CategoriaProdutoRepository categoriaProdutoRepository;
    private final PricingCalculator calculator;

    // Injeção de dependências
    public ProdutoService(ProdutoRepository produtoRepository, ProdutoMapper produtoMapper, CategoriaProdutoRepository categoriaProdutoRepository, PricingCalculator calculator) {
        this.produtoRepository = produtoRepository;
        this.produtoMapper = produtoMapper;
        this.categoriaProdutoRepository = categoriaProdutoRepository;
        this.calculator = calculator;
    }

    /**
     * Cria um novo produto no sistema.
     *
     * @param request Objeto de requisição.
     */
    @Transactional
    public void create(ProdutoCreateRequest request) {
        // Convertendo o DTO em entidade
        Produto produto = this.produtoMapper.postParser(request);

        // Buscando categoria, caso foi passada
        if(!Objects.isNull(request.categoriaId())) {
            produto.setCategoria(
                    this.categoriaProdutoRepository.findById(request.categoriaId())
                    .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"))
            );
        }

        this.produtoRepository.save(produto);
    }

    /**
     * Lista todos os produtos cadastrados no sistema.
     * @return {@link List} de Produtos
     */
    public Page<ProdutoResponse> findAll(FilterExecutor<Produto> filter, Pageable pageable) {
        return this.produtoRepository.findAll(filter.toSpecifications(), pageable)
                .map(produto -> {
                    // Calcula o custo material desse produto.
                    produto.setCustoMaterial(this.calculator.calcularCustoMaterial(produto.getComponentes()));
                    // Calcula o valor de venda desse produto.
                    produto.setValorVenda(this.calculator
                            .calcularValorVendaBase(produto.getCustoMaterial(), produto.getMarkup()));

                    return produto;
                })
                .map(this.produtoMapper::getParser);
    }

    /**
     * Edita os atributos de um produto já cadastrado.
     *
     * @param id Id do produto.
     * @param request Objeto de requisição.
     */
    @Transactional
    public void edit(Long id, ProdutoEditRequest request) {
        // Buscando o produto pelo Id
        Produto produto = this.produtoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Produto não encontrado"));

        // Realizando alterações da request para a entidade
        this.produtoMapper.patchParser(request, produto);

        // Categoria
        produto.setCategoria(Objects.isNull(request.categoriaId())
                ?null
                :this.categoriaProdutoRepository.findById(request.categoriaId())
                    .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"))
        );

        this.produtoRepository.save(produto);
    }

    /**
     * Exclui um produto do sistema.
     * @param id Id do produto.
     */
    @Transactional
    public void delete(Long id) {
        Produto produto = this.produtoRepository.findById(id)
            .orElseThrow(()->new NoSuchElementException("Produto não encontrado"));

        produto.setExcluido(true);
        this.produtoRepository.delete(produto);
    }
}
