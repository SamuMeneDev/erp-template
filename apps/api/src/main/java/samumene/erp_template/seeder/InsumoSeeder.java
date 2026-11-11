package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.insumo.InsumoCreateRequest;
import samumene.erp_template.repository.InsumoRepository;
import samumene.erp_template.service.InsumoService;

@DevelopmentSeeder(3)
public class InsumoSeeder extends BaseSeeder {

    // Dependências
    private final InsumoService insumoService;
    private final InsumoRepository insumoRepository;

    // Injeção de dependências
    public InsumoSeeder(InsumoService insumoService, InsumoRepository insumoRepository) {
        this.insumoService = insumoService;
        this.insumoRepository = insumoRepository;
    }


    @Override
    protected void executarSeeding() throws Exception {
        if(this.insumoRepository.count() < 1) {
            List<InsumoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/insumo-mock.json", InsumoCreateRequest[].class);

            mockList.forEach(this.insumoService::create);
        }
    }
}
