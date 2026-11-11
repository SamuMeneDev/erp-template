package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.precificacao.PrecificacaoCreateRequest;
import samumene.erp_template.dto.request.precificacao.PrecificacaoEditRequest;
import samumene.erp_template.dto.response.PrecificacaoResponse;
import samumene.erp_template.entity.Precificacao;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface PrecificacaoMapper extends
        PostBaseMapper<Precificacao, PrecificacaoCreateRequest>,
        GetBaseMapper<Precificacao, PrecificacaoResponse>,
        PatchBaseMapper<Precificacao, PrecificacaoEditRequest> {
}
