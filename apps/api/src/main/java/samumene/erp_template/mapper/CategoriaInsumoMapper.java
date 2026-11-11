package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.insumo.CategoriaInsumoEditRequest;
import samumene.erp_template.dto.response.CategoriaInsumoResponse;
import samumene.erp_template.entity.insumo.CategoriaInsumo;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface CategoriaInsumoMapper extends GetBaseMapper<CategoriaInsumo, CategoriaInsumoResponse>, PatchBaseMapper<CategoriaInsumo, CategoriaInsumoEditRequest> {
    
}
