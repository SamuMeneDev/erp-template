package samumene.erp_template.specification;


import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import samumene.erp_template.entity.insumo.Insumo;

/**
 * Specifications para buscas de insumos.
 */
public class InsumoSpec {
    /**
     * Busca pelo nome que começa pela string informada
     * @param nome String com o nome similar para busca.
     * @return Objeto Specification.
     */
    public static Specification<Insumo> nomeContains(String nome) {
        return (root, query, criteriaBuilder) -> {
            if (ObjectUtils.isEmpty(nome)) {
                return null;
            } else {
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%"+nome.toLowerCase()+"%");
            }
        };
    }
}
