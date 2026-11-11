package samumene.erp_template.seeder;


import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.produto.ProdutoCreateRequest;
import samumene.erp_template.repository.ProdutoRepository;
import samumene.erp_template.service.ProdutoService;

@DevelopmentSeeder(5)
public class ProdutoSeeder extends BaseSeeder {

    // Dependências
    private final ProdutoRepository produtoRepository;
    private final ProdutoService produtoService;

    // Injeção de dependências
    public ProdutoSeeder(ProdutoRepository produtoRepository, ProdutoService produtoService) {
        this.produtoRepository = produtoRepository;
        this.produtoService = produtoService;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.produtoRepository.count() < 1) {
            List<ProdutoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/produto-mock.json", ProdutoCreateRequest[].class);

            mockList.forEach(this.produtoService::create);
        }
    }
}
