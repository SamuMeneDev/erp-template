package samumene.erp_template.seeder;

import java.util.List;

import samumene.erp_template.annotation.DevelopmentSeeder;
import samumene.erp_template.dto.request.insumo.CategoriaInsumoCreateRequest;
import samumene.erp_template.repository.CategoriaInsumoRepository;
import samumene.erp_template.service.CategoriaInsumoService;

@DevelopmentSeeder(2)
public class CategoriaInsumoSeeder extends BaseSeeder {

    private final CategoriaInsumoService categoriaInsumoService;
    private final CategoriaInsumoRepository categoriaInsumoRepository;

    public CategoriaInsumoSeeder(CategoriaInsumoService categoriaInsumoService, CategoriaInsumoRepository categoriaInsumoRepository) {
        this.categoriaInsumoService = categoriaInsumoService;
        this.categoriaInsumoRepository = categoriaInsumoRepository;
    }

    @Override
    protected void executarSeeding() throws Exception {
        if(this.categoriaInsumoRepository.count() < 1) {
            List<CategoriaInsumoCreateRequest> mockList = this.mockReader
                    .jsonToObjectList("classpath:mock/categoria-insumo-mock.json", CategoriaInsumoCreateRequest[].class);

            mockList.forEach(this.categoriaInsumoService::create);
        }
    }
}
