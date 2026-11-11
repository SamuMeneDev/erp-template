package samumene.erp_template.service;

import java.util.NoSuchElementException;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import samumene.erp_template.dto.request.insumo.InsumoCreateRequest;
import samumene.erp_template.dto.request.insumo.InsumoEditRequest;
import samumene.erp_template.dto.response.InsumoResponse;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.insumo.Insumo;
import samumene.erp_template.enumeration.Status;
import samumene.erp_template.filter.FilterExecutor;
import samumene.erp_template.mapper.InsumoMapper;
import samumene.erp_template.repository.CategoriaInsumoRepository;
import samumene.erp_template.repository.InsumoRepository;

@Service
public class InsumoService {
    // Depencências
    private final InsumoRepository insumoRepository;
    private final CategoriaInsumoRepository categoriaInsumoRepository;
    private final InsumoMapper insumoMapper;
    
    // Injeção de dependências
    public InsumoService(InsumoRepository insumoRepository, CategoriaInsumoRepository categoriaInsumoRepository,
            InsumoMapper insumoMapper) {
        this.insumoRepository = insumoRepository;
        this.categoriaInsumoRepository = categoriaInsumoRepository;
        this.insumoMapper = insumoMapper;
    }

    /**
     * Insere um novo insumo no sistema.
     * 
     * @param request Objeto de requisição.
     */
    @Transactional
    public void create(InsumoCreateRequest request) {
        Insumo insumo = this.insumoMapper.postParser(request);

        // Buscando categoria, se foi passada
        if(!Objects.isNull(request.categoriaId())) {
            insumo.setCategoria(
                    this.categoriaInsumoRepository.findById(request.categoriaId())
                            .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"))
            );
        }

        insumo.setStatus(Status.ATIVADO);

        this.insumoRepository.save(insumo);
    }

    /**
     * Busca todos os insumos cadastrados no sistema.
     * @param filtros Objeto com filtros de busca.
     * @param pageable Objeto para configurações de paginação.
     * @return Um {@link Page} de todos os insumos cadastrados.
     */
    public Page<InsumoResponse> findAll(FilterExecutor<Insumo> filtros, Pageable pageable) {
        // Quantidade mínima de insumos DEVE ser deduzida pelos produtos que o detém.

        return this.insumoRepository.findAll(filtros.toSpecifications(), pageable)
                .map(insumo -> {
                    // Calcula a quantidade mínima desse insumo no sistema.
                    insumo.setQuantMinima(this.calcularQuantidadeMinimaInsumo(insumo));
                    return insumo;
                })
                .map(this.insumoMapper::getParser);
    }

    /**
     * Edita as propriedades de um insumo do sistema.
     * @param id Id do insumo.
     * @param request Objeto de requisição.
     */
    @Transactional
    public void edit(Long id, InsumoEditRequest request) {
        Insumo insumo = this.insumoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Insumo não encontrado"));

        this.insumoMapper.patchParser(request, insumo);

        // Buscando categoria, se foi passada
        insumo.setCategoria(Objects.isNull(request.categoriaId())
                ?null
                :this.categoriaInsumoRepository.findById(request.categoriaId())
                    .orElseThrow(()->new NoSuchElementException("Categoria não encontrada"))
        );

        this.insumoRepository.save(insumo);
    }

    /**
     * Exclui um insumo do sistema.
     * @param id Id do insumo
     */
    @Transactional 
    public void delete(Long id) {
        Insumo insumo = this.insumoRepository.findById(id)
            .orElseThrow(()->new NoSuchElementException("Insumo não encontrado"));

        insumo.setExcluido(true);
        this.insumoRepository.delete(insumo);
    }


    /**
     * Metodo que calcula a quantidade mínima de um insumo baseado em quantos produtos dependem dele.
     * @param insumo Entidade insumo a ser processada.
     * @return Quantidade mínima desse insumo.
     */
    private Integer calcularQuantidadeMinimaInsumo(Insumo insumo) {
        int total = 0;

        // Pra cada componente que esse insumo faz parte
        for(Componente c : insumo.getComponentes()) {
            total += c.getQuantidade() * c.getProduto().getQuantMinima();
        }

        return total;
    }
}
