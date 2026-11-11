package samumene.erp_template.mapper;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

import samumene.erp_template.dto.request.componente.ComponenteEditRequest;
import samumene.erp_template.dto.response.ComponenteResponse;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.repository.InsumoRepository;

@Mapper(config = MapperBaseConfig.class)
public abstract class ComponenteMapper implements 
        GetBaseMapper<Componente, ComponenteResponse>,
        PatchBaseMapper<Componente, ComponenteEditRequest>
{
        @Autowired
        protected InsumoRepository insumoRepository;

        @AfterMapping
        protected void vincularInsumo(ComponenteEditRequest request, @MappingTarget Componente componente) {
                componente.setInsumo(insumoRepository.getReferenceById(request.insumoId()));
        }
}
