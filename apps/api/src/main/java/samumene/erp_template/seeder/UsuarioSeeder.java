package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.usuario.UsuarioRegisterRequest;
import samumene.erp_template.repository.UsuarioRepository;
import samumene.erp_template.service.UsuarioService;

/**
 * Utilitário para testes em desenvolvimento
 */
@DevelopmentSeeder(1)
public class UsuarioSeeder extends BaseSeeder {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    public UsuarioSeeder(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if (this.usuarioRepository.count() < 1) {
            List<UsuarioRegisterRequest> listaMock = this.mockReader
                .jsonToObjectList("classpath:mock/usuario-mock.json", UsuarioRegisterRequest[].class);

            // Cadastra os usuário da lista
            listaMock.forEach(this.usuarioService::register);
        }
    }
}
