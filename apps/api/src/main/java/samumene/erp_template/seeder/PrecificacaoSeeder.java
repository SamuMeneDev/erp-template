package samumene.erp_template.seeder;

import org.jspecify.annotations.NonNull;
import org.springframework.boot.CommandLineRunner;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.precificacao.PrecificacaoCreateRequest;
import samumene.erp_template.repository.PrecificacaoRepository;
import samumene.erp_template.service.PrecificacaoService;

import java.io.IOException;
import java.util.List;

@DevelopmentSeeder(7)
public class PrecificacaoSeeder implements CommandLineRunner {

    // Dependências
    private final PrecificacaoRepository precificacaoRepository;
    private final PrecificacaoService precificacaoService;
    private final MockReader mockReader;

    // Injeção de dependências
    public PrecificacaoSeeder(MockReader mockReader, PrecificacaoService precificacaoService, PrecificacaoRepository precificacaoRepository) {
        this.mockReader = mockReader;
        this.precificacaoService = precificacaoService;
        this.precificacaoRepository = precificacaoRepository;
    }

    @Override
    public void run(String @NonNull ... args) throws IOException {
        if(this.precificacaoRepository.count() < 1) {
            List<PrecificacaoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/precificacao-mock.json", PrecificacaoCreateRequest[].class);

            mockList.forEach(this.precificacaoService::create);
        }
    }
}
