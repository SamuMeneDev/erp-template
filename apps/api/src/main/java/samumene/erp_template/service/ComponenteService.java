package samumene.erp_template.service;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import samumene.erp_template.dto.request.componente.ComponenteCreateRequest;
import samumene.erp_template.dto.request.componente.ComponenteEditRequest;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.insumo.Insumo;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.mapper.ComponenteMapper;
import samumene.erp_template.repository.ComponenteRepository;
import samumene.erp_template.repository.InsumoRepository;
import samumene.erp_template.repository.ProdutoRepository;

import java.util.NoSuchElementException;

@Service
public class ComponenteService {
    // Dependências
    private final ProdutoRepository produtoRepository;
    private final InsumoRepository insumoRepository;
    private final ComponenteRepository componenteRepository;
    private final ComponenteMapper componenteMapper;

    // Injeção de dependencias
    public ComponenteService(ProdutoRepository produtoRepository, InsumoRepository insumoRepository, ComponenteRepository componenteRepository, ComponenteMapper componenteMapper) {
        this.produtoRepository = produtoRepository;
        this.insumoRepository = insumoRepository;
        this.componenteRepository = componenteRepository;
        this.componenteMapper = componenteMapper;
    }

    /**
     * Vincula um insumo a um produto por meio de um componente, adicionando também a quantidade necessária desse insumo
     * @param request Objeto de requisição.
     */
    @Transactional 
    public void create(ComponenteCreateRequest request) {

        // Buscando produto
        Produto produto = this.produtoRepository.findById(request.produtoId())
                .orElseThrow(()->new NoSuchElementException("Produto não encontrado"));

        // Buscando insumo
        Insumo insumo = this.insumoRepository.findById(request.insumoId())
                .orElseThrow(()->new NoSuchElementException("Insumo não encontrado"));

        Componente componente = new Componente(insumo, request.quantidade(), produto);

        this.componenteRepository.save(componente);
    }

    /**
     * Edita um componente já adicionado
     *
     * @param request Objeto de requisição.
     * @param id Id do componente no sistema.
     */
    @Transactional 
    public void edit(Long id, ComponenteEditRequest request) {
        Componente componente = this.componenteRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Componente não encontrado"));

        // Realiza as alterações da request para a entidade
        this.componenteMapper.patchParser(request, componente);

        this.componenteRepository.save(componente);
    }

    /**
     * Exclui um componente de um produto.
     * @param id Id do componente.
     */
    @Transactional 
    public void delete(Long id) {
        Componente componente = this.componenteRepository.findById(id)
            .orElseThrow(()->new NoSuchElementException("Componente não encontrado"));

        this.componenteRepository.delete(componente);
    }
}
