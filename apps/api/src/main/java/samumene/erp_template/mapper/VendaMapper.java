package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.response.venda.VendaResponse;
import samumene.erp_template.entity.Venda;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;

@Mapper(config = MapperBaseConfig.class)
public interface VendaMapper extends
        GetBaseMapper<Venda, VendaResponse> {
}
