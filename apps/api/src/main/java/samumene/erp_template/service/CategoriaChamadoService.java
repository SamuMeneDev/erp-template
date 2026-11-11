package samumene.erp_template.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import samumene.erp_template.dto.request.chamado.CategoriaChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.CategoriaChamadoEditRequest;
import samumene.erp_template.dto.response.CategoriaChamadoResponse;
import samumene.erp_template.entity.chamado.CategoriaChamado;
import samumene.erp_template.mapper.CategoriaChamadoMapper;
import samumene.erp_template.repository.CategoriaChamadoRepository;

@Service
public class CategoriaChamadoService {

    private final CategoriaChamadoRepository categoriaChamadoRepository;
    private final CategoriaChamadoMapper categoriaChamadoMapper;


    public CategoriaChamadoService(CategoriaChamadoRepository categoriaChamadoRepository, CategoriaChamadoMapper categoriaChamadoMapper) {
        this.categoriaChamadoRepository = categoriaChamadoRepository;
        this.categoriaChamadoMapper = categoriaChamadoMapper;
    }

    public void create(CategoriaChamadoCreateRequest request) {
        CategoriaChamado categoriaChamado = this.categoriaChamadoMapper.postParser(request);
        categoriaChamadoRepository.save(categoriaChamado);
    }

    public List<CategoriaChamadoResponse> findAll() {
        return this.categoriaChamadoMapper
        .getEntityList(this.categoriaChamadoRepository.findAll());
    }

    public void edit(Long id, CategoriaChamadoEditRequest request) {
        CategoriaChamado categoriaChamado = this.categoriaChamadoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Categoria de chamado não encontrada"));

        this.categoriaChamadoMapper.patchParser(request, categoriaChamado);
        this.categoriaChamadoRepository.save(categoriaChamado);
    }

    public void delete(Long id) {
        CategoriaChamado categoriaChamado = this.categoriaChamadoRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Categoria de chamado não encontrada"));

        this.categoriaChamadoRepository.delete(categoriaChamado);
    }
}
