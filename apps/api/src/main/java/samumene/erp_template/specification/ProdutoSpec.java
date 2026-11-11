package samumene.erp_template.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import samumene.erp_template.entity.produto.Produto;

public class ProdutoSpec {

    public static Specification<Produto> codigoContains(String codigo) {
        return (root, query, criteriaBuilder) -> {
            if(ObjectUtils.isEmpty(codigo)) {
                return null;
            } else {
                return criteriaBuilder.like(root.get("codigo"), codigo+"%");
            }
        };
    }

    public static Specification<Produto> nomeContains(String nome) {
        return (root, query, criteriaBuilder) -> {
            if (ObjectUtils.isEmpty(nome)) {
                return null;
            } else {
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%"+nome.toLowerCase()+"%");
            }
        };
    }

}
