package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.produto.CategoriaProdutoCreateRequest;
import samumene.erp_template.repository.CategoriaProdutoRepository;
import samumene.erp_template.service.CategoriaProdutoService;

@DevelopmentSeeder(4)
public class CategoriaProdutoSeeder extends BaseSeeder {

    private final CategoriaProdutoService categoriaProdutoService;
    private final CategoriaProdutoRepository categoriaProdutoRepository;

    public CategoriaProdutoSeeder(CategoriaProdutoService categoriaProdutoService, CategoriaProdutoRepository categoriaProdutoRepository) {
        this.categoriaProdutoService = categoriaProdutoService;
        this.categoriaProdutoRepository = categoriaProdutoRepository;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.categoriaProdutoRepository.count() < 1) {
            List<CategoriaProdutoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/categoria-produto-mock.json", CategoriaProdutoCreateRequest[].class);

            mockList.forEach(this.categoriaProdutoService::create);
        }
    }
}
