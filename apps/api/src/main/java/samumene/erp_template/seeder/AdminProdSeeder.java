package samumene.erp_template.seeder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;

import samumene.erp_template.annotation.ProductionSeeder;
import samumene.erp_template.dto.request.usuario.UsuarioRegisterRequest;
import samumene.erp_template.repository.UsuarioRepository;
import samumene.erp_template.service.UsuarioService;

@ProductionSeeder(1)
public final class AdminProdSeeder implements CommandLineRunner {

    @Value("${api.admin.first.email}")
    private String firstEmail;

    @Value("${api.admin.first.password}")
    private String firstPassword;

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    public AdminProdSeeder(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String ...args) {
        if(this.usuarioRepository.count() < 1) {
            var admin = new UsuarioRegisterRequest("Admin", firstEmail, firstPassword, "ADMIN");
            this.usuarioService.register(admin);
        }
    }
}
