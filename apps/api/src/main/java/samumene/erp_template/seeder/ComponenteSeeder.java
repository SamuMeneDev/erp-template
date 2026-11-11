package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.componente.ComponenteCreateRequest;
import samumene.erp_template.repository.ComponenteRepository;
import samumene.erp_template.service.ComponenteService;

@DevelopmentSeeder(6)
public class ComponenteSeeder extends BaseSeeder {

    // Dependências
    private final ComponenteService componenteService;
    private final ComponenteRepository componenteRepository;

    // Injeção de dependências
    public ComponenteSeeder(ComponenteService componenteService, ComponenteRepository componenteRepository) {
        this.componenteService = componenteService;
        this.componenteRepository = componenteRepository;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.componenteRepository.count() < 1) {
            List<ComponenteCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/componente-mock.json", ComponenteCreateRequest[].class);

            mockList.forEach(this.componenteService::create);
        }
    }
}
