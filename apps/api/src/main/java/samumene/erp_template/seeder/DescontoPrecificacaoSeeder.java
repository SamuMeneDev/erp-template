package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.desconto.DescontoPrecificacaoCreateRequest;
import samumene.erp_template.repository.DescontoPrecificacaoRepository;
import samumene.erp_template.service.DescontoPrecificacaoService;

@DevelopmentSeeder(8)
public class DescontoPrecificacaoSeeder extends BaseSeeder {

    // Dependências
    private final DescontoPrecificacaoRepository descontoPrecificacaoRepository;
    private final DescontoPrecificacaoService descontoPrecificacaoService;

    // Injeção de dependências
    public DescontoPrecificacaoSeeder(DescontoPrecificacaoRepository descontoPrecificacaoRepository, DescontoPrecificacaoService descontoPrecificacaoService) {
        this.descontoPrecificacaoRepository = descontoPrecificacaoRepository;
        this.descontoPrecificacaoService = descontoPrecificacaoService;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.descontoPrecificacaoRepository.count() < 1) {
            List<DescontoPrecificacaoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/desconto-precificacao-mock.json", DescontoPrecificacaoCreateRequest[].class);

            mockList.forEach(this.descontoPrecificacaoService::create);
        }
    }
}
