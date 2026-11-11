package samumene.erp_template.service;

import java.util.NoSuchElementException;

import jakarta.persistence.EntityManager;
import samumene.erp_template.dto.request.insumo.CategoriaInsumoCreateRequest;
import samumene.erp_template.dto.request.insumo.CategoriaInsumoEditRequest;
import samumene.erp_template.dto.response.CategoriaInsumoResponse;
import samumene.erp_template.entity.insumo.CategoriaInsumo;
import samumene.erp_template.filter.FilterExecutor;
import samumene.erp_template.mapper.CategoriaInsumoMapper;
import samumene.erp_template.repository.CategoriaInsumoRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriaInsumoService {

    // Dependências
    private final CategoriaInsumoRepository categoriaInsumoRepository;
    private final CategoriaInsumoMapper categoriaInsumoMapper;
    private final EntityManager entityManager;

    // Injeção de dependências
    public CategoriaInsumoService(CategoriaInsumoRepository categoriaInsumoRepository,
            CategoriaInsumoMapper categoriaInsumoMapper, EntityManager entityManager) {
        this.categoriaInsumoRepository = categoriaInsumoRepository;
        this.categoriaInsumoMapper = categoriaInsumoMapper;
        this.entityManager = entityManager;
    }


    /**
     * Cria uma nova categoria de insumos.
     * 
     * @param request Objeto de requisição.
     */
    public void create(CategoriaInsumoCreateRequest request) {
        CategoriaInsumo categoria = new CategoriaInsumo();
        categoria.setNome(request.nome());

        categoriaInsumoRepository.save(categoria);
    }

    /**
     * Busca as categorias de insumos cadastradas no sistema.
     * @return {@link Page} das categorias.
     */
    public Page<CategoriaInsumoResponse> findAll(FilterExecutor<CategoriaInsumo> filter, Pageable pageable) {
        return this.categoriaInsumoRepository.findAll(filter.toSpecifications(), pageable)
                .map(this.categoriaInsumoMapper::getParser);
    }

    /**
     * Altera as propriedades de uma categoria.
     * 
     * @param id Id da categoria alvo.
     * @param request Objeto de requisição.
     */
    public void edit(Long id, CategoriaInsumoEditRequest request) {
        CategoriaInsumo categoria = this.categoriaInsumoRepository.findById(id)
            .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"));

        this.categoriaInsumoMapper.patchParser(request, categoria);
        
        this.categoriaInsumoRepository.save(categoria);
    }

    /**
     * Exclui do sistema uma categoria de insumos.
     * @param id Id da categoria de insumos.
     */
    public void delete(Long id) {
        if(!this.categoriaInsumoRepository.existsById(id)) {
            throw new NoSuchElementException("Categoria não encontrada");
        }

        this.categoriaInsumoRepository.deleteById(id);
        this.entityManager.clear();
    }
}
