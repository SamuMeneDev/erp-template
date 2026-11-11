package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.response.SelecaoVendaResponse;
import samumene.erp_template.entity.SelecaoVenda;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;

@Mapper(config = MapperBaseConfig.class)
public interface SelecaoVendaResponseMapper
        extends GetBaseMapper<SelecaoVenda, SelecaoVendaResponse> {}
