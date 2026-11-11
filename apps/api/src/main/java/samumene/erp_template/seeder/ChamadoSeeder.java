package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.chamado.ChamadoCreateRequest;
import samumene.erp_template.entity.Usuario;
import samumene.erp_template.repository.ChamadoRepository;
import samumene.erp_template.repository.UsuarioRepository;
import samumene.erp_template.service.ChamadoService;

@DevelopmentSeeder(11)
public class ChamadoSeeder extends BaseSeeder {
    
    private final ChamadoService chamadoService;
    private final UsuarioRepository usuarioRepository;
    private final ChamadoRepository chamadoRepository;    

    public ChamadoSeeder(ChamadoService chamadoService, UsuarioRepository usuarioRepository,
            ChamadoRepository chamadoRepository) {
        this.chamadoService = chamadoService;
        this.usuarioRepository = usuarioRepository;
        this.chamadoRepository = chamadoRepository;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.chamadoRepository.count() < 1) {
            List<ChamadoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/chamado-mock.json", ChamadoCreateRequest[].class);

            // Usuário usado como autor dos chamados
            Usuario usuarioAutor = this.usuarioRepository.getReferenceById(2L);
            mockList.forEach(m->{
                this.chamadoService.create(m, usuarioAutor);
            });
        }
    }
}
