package samumene.erp_template.service;

import java.util.NoSuchElementException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.chamado.MensagemChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.MensagemChamadoEditRequest;
import samumene.erp_template.dto.response.MensagemChamadoResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.entity.chamado.Chamado;
import samumene.erp_template.entity.chamado.MensagemChamado;
import samumene.erp_template.mapper.MensagemChamadoMapper;
import samumene.erp_template.repository.ChamadoRepository;
import samumene.erp_template.repository.MensagemChamadoRepository;

@Service 
public class MensagemChamadoService {
    
    private final MensagemChamadoRepository mensagemChamadoRepository;
    private final ChamadoRepository chamadoRepository;
    private final MensagemChamadoMapper mensagemChamadoMapper;


    public MensagemChamadoService(MensagemChamadoRepository mensagemChamadoRepository,
            ChamadoRepository chamadoRepository, MensagemChamadoMapper mensagemChamadoMapper) {
        this.mensagemChamadoRepository = mensagemChamadoRepository;
        this.chamadoRepository = chamadoRepository;
        this.mensagemChamadoMapper = mensagemChamadoMapper;
    }

    public void create(Long idChamado,  MensagemChamadoCreateRequest request, Usuario usuario) {
        Chamado chamado = this.chamadoRepository.findById(idChamado)
            .orElseThrow(()-> new NoSuchElementException("Chamado não encontrado"));

        MensagemChamado mensagem = this.mensagemChamadoMapper.postParser(request);
        mensagem.setChamado(chamado);
        mensagem.setAutor(usuario);

        this.mensagemChamadoRepository.save(mensagem);
    }

    public void edit(Long id, MensagemChamadoEditRequest request) {
        MensagemChamado mensagem = this.mensagemChamadoRepository
            .findById(id).orElseThrow(()->new NoSuchElementException("Mensagem não encontrada"));

        this.mensagemChamadoMapper.patchParser(request, mensagem);

        this.mensagemChamadoRepository.save(mensagem);
    }

    /**
     * Busca todas as mensagens de um chamado.
     * @param idChamado Id unico do chamado.
     * @param pageable Objeto de paginação.
     * @return Lista paginada com as mensagem do chamado informado.
     */
    public Page<MensagemChamadoResponse> findAllByChamado(Long idChamado, Pageable pageable) {

        Chamado chamado = this.chamadoRepository.findById(idChamado)
            .orElseThrow(()-> new NoSuchElementException("Chamado não encontrado"));

        return this.mensagemChamadoRepository.findAllByChamado(chamado, pageable)
            .map(this.mensagemChamadoMapper::getParser)
            .map(MensagemChamadoResponse::ifExclude);  
    }


    public void delete(Long id) {
        MensagemChamado mensagem = this.mensagemChamadoRepository.findById(id)
        .orElseThrow(()->new NoSuchElementException("Mensagem não encontrada"));

        this.mensagemChamadoRepository.delete(mensagem);
    }
}
