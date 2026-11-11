package samumene.erp_template.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.chamado.ChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.ChamadoEditRequest;
import samumene.erp_template.dto.request.chamado.ChamadoStatusEditRequest;
import samumene.erp_template.dto.response.ChamadoResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.entity.chamado.CategoriaChamado;
import samumene.erp_template.entity.chamado.Chamado;
import samumene.erp_template.enumeration.StatusChamado;
import samumene.erp_template.mapper.ChamadoMapper;
import samumene.erp_template.repository.CategoriaChamadoRepository;
import samumene.erp_template.repository.ChamadoRepository;

@Service 
public class ChamadoService {
    
    private final ChamadoRepository chamadoRepository;
    private final CategoriaChamadoRepository categoriaChamadoRepository;
    private final ChamadoMapper chamadoMapper;
    
    public ChamadoService(ChamadoRepository chamadoRepository, CategoriaChamadoRepository categoriaChamadoRepository, ChamadoMapper chamadoMapper) {
        this.chamadoRepository = chamadoRepository;
        this.categoriaChamadoRepository = categoriaChamadoRepository;
        this.chamadoMapper = chamadoMapper;
    }


    public void create(ChamadoCreateRequest request, Usuario usuario) {
        CategoriaChamado categoria = this.categoriaChamadoRepository.findById(request.idCategoria())
            .orElseThrow(() -> new NoSuchElementException("Categoria não encontrada"));
        
        Chamado chamado = this.chamadoMapper.postParser(request);

        chamado.setCategoria(categoria);
        chamado.setAutor(usuario);

        chamado.setStatus(StatusChamado.PENDENTE);

        this.chamadoRepository.save(chamado);
    }

    public void edit(Long id, ChamadoEditRequest request) {
        Chamado chamado = this.chamadoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Chamado não encontrado"));

        this.chamadoMapper.patchParser(request, chamado);
        
        this.chamadoRepository.save(chamado);
    }

    public void delete(Long id) {
        Chamado chamado = this.chamadoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Chamado não encontrado"));

        this.chamadoRepository.delete(chamado);
    }

    /**
     * Lista os chamados abertos pelo usuário autênticado.
     * @param usuario Referência do {@link Usuario} autênticado.
     * @return Uma {@link List} dos chamados abertos pelo usuário autênticado.
     */
    public List<ChamadoResponse> findAll(Usuario usuario) {
        return this.chamadoMapper.getEntityList(this.chamadoRepository.findAllByAutor(usuario));
    }

    public List<ChamadoResponse> findAll() {
        return this.chamadoMapper.getEntityList(this.chamadoRepository.findAll());
    }

    public void alterarStatusChamado(Long id, ChamadoStatusEditRequest request) {
        Chamado chamado = this.chamadoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Chamado não encontrado"));

        chamado.setStatus(StatusChamado.valueOf(request.status()));
        this.chamadoRepository.save(chamado);
    }
}
