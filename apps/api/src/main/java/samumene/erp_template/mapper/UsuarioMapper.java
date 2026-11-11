package samumene.erp_template.mapper;

import org.mapstruct.Mapper;

import samumene.erp_template.dto.request.usuario.UsuarioEditRequest;
import samumene.erp_template.dto.response.UsuarioResponse;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.mapper.base.GetBaseMapper;
import samumene.erp_template.mapper.base.MapperBaseConfig;
import samumene.erp_template.mapper.base.PatchBaseMapper;

@Mapper(config = MapperBaseConfig.class)
public interface UsuarioMapper extends
        GetBaseMapper<Usuario, UsuarioResponse>,
        PatchBaseMapper<Usuario, UsuarioEditRequest>
{}
