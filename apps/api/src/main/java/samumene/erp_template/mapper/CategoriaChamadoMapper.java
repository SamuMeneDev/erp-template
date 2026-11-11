package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.chamado.CategoriaChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.CategoriaChamadoEditRequest;
import samumene.erp_template.dto.response.CategoriaChamadoResponse;
import samumene.erp_template.entity.chamado.CategoriaChamado;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface CategoriaChamadoMapper extends
    PostBaseMapper<CategoriaChamado, CategoriaChamadoCreateRequest>,
    GetBaseMapper<CategoriaChamado, CategoriaChamadoResponse>,
    PatchBaseMapper<CategoriaChamado, CategoriaChamadoEditRequest> {}
