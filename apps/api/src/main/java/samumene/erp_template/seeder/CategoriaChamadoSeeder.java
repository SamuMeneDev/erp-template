package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.chamado.CategoriaChamadoCreateRequest;
import samumene.erp_template.repository.CategoriaChamadoRepository;
import samumene.erp_template.service.CategoriaChamadoService;

@DevelopmentSeeder(10)
public class CategoriaChamadoSeeder extends BaseSeeder {
    
    private final CategoriaChamadoRepository categoriaChamadoRepository;
    private final CategoriaChamadoService categoriaChamadoService;    

    public CategoriaChamadoSeeder(CategoriaChamadoRepository categoriaChamadoRepository,
            CategoriaChamadoService categoriaChamadoService) {
        this.categoriaChamadoRepository = categoriaChamadoRepository;
        this.categoriaChamadoService = categoriaChamadoService;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.categoriaChamadoRepository.count() < 1) {
            List<CategoriaChamadoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/categoria-chamado-mock.json", CategoriaChamadoCreateRequest[].class);

            mockList.forEach(this.categoriaChamadoService::create);
        }
    }
}
