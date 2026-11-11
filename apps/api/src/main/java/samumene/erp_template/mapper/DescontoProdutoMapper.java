package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.desconto.DescontoProdutoCreateRequest;
import samumene.erp_template.dto.request.desconto.DescontoProdutoEditRequest;
import samumene.erp_template.dto.response.DescontoProdutoResponse;
import samumene.erp_template.entity.desconto.DescontoProduto;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface DescontoProdutoMapper extends
        PostBaseMapper<DescontoProduto, DescontoProdutoCreateRequest>,
        GetBaseMapper<DescontoProduto, DescontoProdutoResponse>,
        PatchBaseMapper<DescontoProduto, DescontoProdutoEditRequest>
{}
