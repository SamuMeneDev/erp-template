package samumene.erp_template.service;

import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.precificacao.PrecificacaoCreateRequest;
import samumene.erp_template.dto.request.precificacao.PrecificacaoEditRequest;
import samumene.erp_template.dto.response.PrecificacaoResponse;
import samumene.erp_template.entity.Precificacao;
import samumene.erp_template.mapper.PrecificacaoMapper;
import samumene.erp_template.repository.PrecificacaoRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PrecificacaoService {
    // Dependências
    private final PrecificacaoMapper precificacaoMapper;
    private final PrecificacaoRepository precificacaoRepository;

    // Injeção de depencências
    public PrecificacaoService(PrecificacaoMapper precificacaoMapper, PrecificacaoRepository precificacaoRepository) {
        this.precificacaoMapper = precificacaoMapper;
        this.precificacaoRepository = precificacaoRepository;
    }

    /**
     * Exclui uma precificação do sistema.
     * @param id Id da precificação.
     */
    public void delete(Long id) {
        if(!this.precificacaoRepository.existsById(id)) {
            throw new NoSuchElementException("Precificação não encontrada");
        }
        this.precificacaoRepository.deleteById(id);
    }

    /**
     * Realiza alterações em uma precificação já cadastrada.
     * @param id Id da precificação.
     * @param request Objeto de requisição.
     */
    public void edit(Long id, PrecificacaoEditRequest request) {
        Precificacao precificacao = this.precificacaoRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Precificação não encontrada"));

        // Realiza alterações da request para a entidade
        this.precificacaoMapper.patchParser(request, precificacao);

        this.precificacaoRepository.save(precificacao);
    }

    /**
     * Busca todas as precificações cadastradas no sistema.
     */
    public List<PrecificacaoResponse> findAll() {
        return this.precificacaoMapper
            .getEntityList(this.precificacaoRepository.findAll());
    }

    /**
     * Cria uma nova precificação.
     * @param request Objeto de requisição.
     */
    public void create(PrecificacaoCreateRequest request) {
        Precificacao p = this.precificacaoMapper.postParser(request);
        this.precificacaoRepository.save(p);
    }

}
