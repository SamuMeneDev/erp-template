package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.chamado.MensagemChamadoCreateRequest;
import samumene.erp_template.dto.request.chamado.MensagemChamadoEditRequest;
import samumene.erp_template.dto.response.MensagemChamadoResponse;
import samumene.erp_template.entity.chamado.MensagemChamado;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface MensagemChamadoMapper extends
    PostBaseMapper<MensagemChamado, MensagemChamadoCreateRequest>,
    PatchBaseMapper<MensagemChamado, MensagemChamadoEditRequest>,
    GetBaseMapper<MensagemChamado, MensagemChamadoResponse> {
    
}
