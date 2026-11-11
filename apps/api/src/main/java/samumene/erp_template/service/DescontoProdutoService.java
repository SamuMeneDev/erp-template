package samumene.erp_template.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import samumene.erp_template.dto.request.desconto.DescontoProdutoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoProdutoEditRequest;
import samumene.erp_template.dto.response.DescontoProdutoResponse;
import samumene.erp_template.entity.desconto.DescontoProduto;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.mapper.DescontoProdutoMapper;
import samumene.erp_template.repository.DescontoProdutoRepository;
import samumene.erp_template.repository.ProdutoRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class DescontoProdutoService {

    // Dependências
    private final DescontoProdutoRepository descontoProdutoRepository;
    private final DescontoProdutoMapper descontoProdutoMapper;
    private final ProdutoRepository produtoRepository;

    // Injeção de Dependências
    public DescontoProdutoService(DescontoProdutoRepository descontoProdutoRepository, DescontoProdutoMapper descontoProdutoMapper, ProdutoRepository produtoRepository) {
        this.descontoProdutoRepository = descontoProdutoRepository;
        this.descontoProdutoMapper = descontoProdutoMapper;
        this.produtoRepository = produtoRepository;
    }

    /**
     * Cria um novo desconto desse produto.
     * @param request Objeto de requisição.
     */
    @Transactional
    public void create(DescontoProdutoCreateRequest request) {
        DescontoProduto desconto = this.descontoProdutoMapper.postParser(request);

        // Buscando produto
        Produto p = this.produtoRepository.findById(request.idProduto())
                .orElseThrow(()->new NoSuchElementException("Produto não encontrado"));

        desconto.setProduto(p);

        this.descontoProdutoRepository.save(desconto);
    }

    /**
     * Lista todos os descontos específicos desse produto.
     * @param idProduto Id único do produto.
     * @return {@link List} dos Descontos do produto.
     */
    public List<DescontoProdutoResponse> findAll(Long idProduto) {
        return this.descontoProdutoMapper
            .getEntityList(this.descontoProdutoRepository.findAllByProdutoId(idProduto));
    }


    /**
     * Realiza modificações em um desconto já existente
     * @param id Id do desconto.
     * @param request Objeto de requisição.
     */
    public void edit(Long id, DescontoProdutoEditRequest request) {
        // Verificando se existe e buscando desconto
        DescontoProduto desconto = this.descontoProdutoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Desconto não encontrado"));

        // Aplicando alterações da request para a entidade
        this.descontoProdutoMapper.patchParser(request, desconto);

        this.descontoProdutoRepository.save(desconto);
    }


    /**
     * Exclui um desconto de um produto pelo Id
     * @param id Id do desconto.
     */
    public void delete(Long id) {
        if(!this.descontoProdutoRepository.existsById(id)) {
            throw new NoSuchElementException("Desconto não encontrado");
        }

        this.descontoProdutoRepository.deleteById(id);
    }
}
