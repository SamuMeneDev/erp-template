package samumene.erp_template.mapper;

import java.util.NoSuchElementException;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import samumene.erp_template.dto.request.chamado.ChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.ChamadoEditRequest;
import samumene.erp_template.dto.response.ChamadoResponse;
import samumene.erp_template.entity.chamado.Chamado;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;
import samumene.erp_template.repository.CategoriaChamadoRepository;


@Mapper(config = MapperBaseConfig.class)
public abstract class ChamadoMapper
    implements PostBaseMapper<Chamado, ChamadoCreateRequest>,
    GetBaseMapper<Chamado, ChamadoResponse>,
    PatchBaseMapper<Chamado, ChamadoEditRequest> {

    @Autowired
    protected CategoriaChamadoRepository categoriaChamadoRepository;

        @AfterMapping
        protected void vincularCategoria(ChamadoEditRequest request, @MappingTarget Chamado chamado) {
            if(request.idCategoria() != null) {
                if(!this.categoriaChamadoRepository.existsById(request.idCategoria())) {
                    throw new NoSuchElementException("Categoria não encontrada");
                }
                chamado.setCategoria(categoriaChamadoRepository.getReferenceById(request.idCategoria()));
            }
        }

}
