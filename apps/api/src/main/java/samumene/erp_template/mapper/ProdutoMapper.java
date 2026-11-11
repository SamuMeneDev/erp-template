package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.produto.ProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.ProdutoEditRequest;
import samumene.erp_template.dto.response.ProdutoResponse;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface ProdutoMapper extends
        PostBaseMapper<Produto, ProdutoCreateRequest>,
        GetBaseMapper<Produto, ProdutoResponse>,
        PatchBaseMapper<Produto, ProdutoEditRequest> {
}
