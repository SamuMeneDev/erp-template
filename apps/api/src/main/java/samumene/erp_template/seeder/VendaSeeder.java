package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.venda.VendaCreateRequest;
import samumene.erp_template.repository.VendaRepository;
import samumene.erp_template.service.VendaService;

@DevelopmentSeeder(9)
public class VendaSeeder extends BaseSeeder {

    // Dependências
    private final VendaRepository vendaRepository;
    private final VendaService vendaService;

    // Injeção de dependências
    public VendaSeeder(VendaRepository vendaRepository, VendaService vendaService) {
        this.vendaRepository = vendaRepository;
        this.vendaService = vendaService;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.vendaRepository.count() < 1) {
            List<VendaCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/venda-mock.json", VendaCreateRequest[].class);

            mockList.forEach(this.vendaService::venda);
        }
    }
}
