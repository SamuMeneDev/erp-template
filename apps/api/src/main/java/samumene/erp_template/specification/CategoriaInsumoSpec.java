package samumene.erp_template.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import samumene.erp_template.entity.insumo.CategoriaInsumo;

public class CategoriaInsumoSpec {

    public static Specification<CategoriaInsumo> nomeContains(String nome) {
        return (root, query, criteriaBuilder) -> {
            if (ObjectUtils.isEmpty(nome)) {
                return null;
            } else {
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%"+nome.toLowerCase()+"%");
            }
        };
    }
}
