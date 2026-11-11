package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.produto.CategoriaProdutoCreateRequest;
import samumene.erp_template.dto.request.produto.CategoriaProdutoEditRequest;
import samumene.erp_template.dto.response.CategoriaProdutoResponse;
import samumene.erp_template.entity.produto.CategoriaProduto;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;
import samumene.erp_template.mapper.base.PostBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface CategoriaProdutoMapper extends
        PostBaseMapper<CategoriaProduto, CategoriaProdutoCreateRequest>,
        GetBaseMapper<CategoriaProduto, CategoriaProdutoResponse>,
        PatchBaseMapper<CategoriaProduto, CategoriaProdutoEditRequest>
{}
