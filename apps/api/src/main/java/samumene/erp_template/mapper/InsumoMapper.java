package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.insumo.InsumoCreateRequest;
import samumene.erp_template.dto.request.insumo.InsumoEditRequest;
import samumene.erp_template.dto.response.InsumoResponse;
import samumene.erp_template.entity.insumo.Insumo;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface InsumoMapper extends
        GetBaseMapper<Insumo, InsumoResponse>,
        PostBaseMapper<Insumo, InsumoCreateRequest>,
        PatchBaseMapper<Insumo, InsumoEditRequest>
{}
