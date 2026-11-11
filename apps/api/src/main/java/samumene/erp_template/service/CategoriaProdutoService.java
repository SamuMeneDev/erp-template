package samumene.erp_template.service;

import jakarta.persistence.EntityManager;
import samumene.erp_template.dto.request.produto.CategoriaProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.CategoriaProdutoEditRequest;
import samumene.erp_template.dto.response.CategoriaProdutoResponse;
import samumene.erp_template.entity.produto.CategoriaProduto;
import samumene.erp_template.filter.FilterExecutor;
import samumene.erp_template.mapper.CategoriaProdutoMapper;
import samumene.erp_template.repository.CategoriaProdutoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CategoriaProdutoService {
    // Dependências
    private final CategoriaProdutoRepository categoriaProdutoRepository;
    private final CategoriaProdutoMapper categoriaProdutoMapper;
    private final EntityManager entityManager;

    // Injeção de dependências
    public CategoriaProdutoService(CategoriaProdutoRepository categoriaProdutoRepository, CategoriaProdutoMapper categoriaProdutoMapper, EntityManager entityManager) {
        this.categoriaProdutoRepository = categoriaProdutoRepository;
        this.categoriaProdutoMapper = categoriaProdutoMapper;
        this.entityManager = entityManager;
    }

    /**
     * Criação de uma nova categoria de produtos.
     * @param request Objeto de requisição.
     */
    public void create(CategoriaProdutoCreateRequest request) {
        CategoriaProduto categoriaProduto = this.categoriaProdutoMapper.postParser(request);

        this.categoriaProdutoRepository.save(categoriaProduto);
    }

    /**
     * Busca todas as categorias de produtos cadastradas no sistema.
     * @return Um {@link List} das categorias cadastradas.
     */
    public Page<CategoriaProdutoResponse> findAll(FilterExecutor<CategoriaProduto> filter, Pageable pageable) {
        return this.categoriaProdutoRepository.findAll(filter.toSpecifications(), pageable)
                .map(this.categoriaProdutoMapper::getParser);
    }

    /**
     * Edita uma categoria de produtos.
     * @param id Id da categoria.
     * @param request Objeto de requisição.
     */
    public void edit(Long id, CategoriaProdutoEditRequest request) {
        CategoriaProduto categoriaProduto = this.categoriaProdutoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"));

        // Realiza as alterações da request para a entidade
        this.categoriaProdutoMapper.patchParser(request, categoriaProduto);

        this.categoriaProdutoRepository.save(categoriaProduto);
    }

    /**
     * Exclui uma categoria de produtos.
     * @param id Id da categoria.
     */
    public void delete(Long id) {
        if(!this.categoriaProdutoRepository.existsById(id)) {
            throw new NoSuchElementException("Categoria não encontrada");
        }


        this.categoriaProdutoRepository.deleteById(id);
        this.entityManager.clear();
    }
}
