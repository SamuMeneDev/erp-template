package samumene.erp_template.service;

import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoEditRequest;
import samumene.erp_template.dto.response.DescontoPrecificacaoResponse;
import samumene.erp_template.entity.Precificacao;
import samumene.erp_template.entity.desconto.DescontoPrecificacao;
import samumene.erp_template.mapper.DescontoPrecificacaoMapper;
import samumene.erp_template.repository.DescontoPrecificacaoRepository;
import samumene.erp_template.repository.PrecificacaoRepository;

import java.util.List;
import java.util.NoSuchElementException;


/**
 * Service especifica para manipulação e perssistência de Descontos da precificação.
 * @see samumene.erp_template.entity.desconto.DescontoPrecificacao
 */
@Service 
public class DescontoPrecificacaoService {
    // Dependências
    private final PrecificacaoRepository precificacaoRepository;
    private final DescontoPrecificacaoMapper descontoPrecificacaoMapper;
    private final DescontoPrecificacaoRepository descontoPrecificacaoRepository;

    // Injeção de Dependências
    public DescontoPrecificacaoService(PrecificacaoRepository precificacaoRepository, DescontoPrecificacaoMapper descontoPrecificacaoMapper, DescontoPrecificacaoRepository descontoPrecificacaoRepository) {
        this.precificacaoRepository = precificacaoRepository;
        this.descontoPrecificacaoMapper = descontoPrecificacaoMapper;
        this.descontoPrecificacaoRepository = descontoPrecificacaoRepository;
    }

    /**
     * Cria um novo desconto de uma precificação.
     * @param request Objeto de requisição.
     */
    public void create(DescontoPrecificacaoCreateRequest request) {
        // Converte DTO em Entidade
        DescontoPrecificacao d = this.descontoPrecificacaoMapper.postParser(request);

        // Se o id da precificação foi informado
        if(request.idPrecificacao() != null) {
            // Verifica se existe e busca Precificacao
            Precificacao p = this.precificacaoRepository.findById(request.idPrecificacao())
                    .orElseThrow(()->new NoSuchElementException("Precificação não encontrada"));

            d.setPrecificacao(p); // Vincula esse desconto com a precificação
        }

        this.descontoPrecificacaoRepository.save(d);
    }

    /**
     * Lista todos os descontos dessa Precificação.
     * @return {@link List} de Decontos
     */
    public List<DescontoPrecificacaoResponse> findAll(Long idPrecificacao) {
        return this.descontoPrecificacaoMapper
                .getEntityList(this.descontoPrecificacaoRepository.findAllDescontoByPrecificacao(idPrecificacao));
    }

    public List<DescontoPrecificacaoResponse> findAllGlobal() {
        return this.descontoPrecificacaoMapper
                .getEntityList(this.descontoPrecificacaoRepository.findAllDescontoGlobal());
    }


    /**
     * Edita os dados de um desconto da precificação (ou global) já cadastrados.
     * @param id Id do desconto.
     * @param request Objeto de requisição.
     */
    public void edit(Long id, DescontoPrecificacaoEditRequest request) {
        // Buscando desconto existente
        DescontoPrecificacao desconto = this.descontoPrecificacaoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Desconto não encontrado"));

        // Realizando merge da entidade existente com o request body
        this.descontoPrecificacaoMapper.patchParser(request, desconto);

        this.descontoPrecificacaoRepository.save(desconto);
    }


    /**
     * Exclui um desconto já criado no sistema.
     * @param id Id do desconto.
     */
    public void delete(Long id) {
        if(!this.descontoPrecificacaoRepository.existsById(id)) {
            throw new NoSuchElementException("Desconto não encontrado");
        }

        this.descontoPrecificacaoRepository.deleteById(id);
    }
}
