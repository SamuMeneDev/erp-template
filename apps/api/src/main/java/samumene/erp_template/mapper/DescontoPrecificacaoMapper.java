package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoEditRequest;
import samumene.erp_template.dto.response.DescontoPrecificacaoResponse;
import samumene.erp_template.entity.desconto.DescontoPrecificacao;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface DescontoPrecificacaoMapper extends
        PostBaseMapper<DescontoPrecificacao, DescontoPrecificacaoCreateRequest>,
        GetBaseMapper<DescontoPrecificacao, DescontoPrecificacaoResponse>,
        PatchBaseMapper<DescontoPrecificacao, DescontoPrecificacaoEditRequest>
{}
