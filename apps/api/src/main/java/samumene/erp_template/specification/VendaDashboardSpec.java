package samumene.erp_template.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import samumene.erp_template.entity.Venda;
import samumene.erp_template.enumeration.StatusVenda;

import java.time.LocalDate;

public class VendaDashboardSpec {

    public static Specification<Venda> dataInicioEquals(LocalDate dataInicio) {
        return (root, query, builder) -> {
            if(ObjectUtils.isEmpty(dataInicio)) {
                return null;
            } else {
                return builder.greaterThanOrEqualTo(root.get("dataCriacao"), dataInicio);
            }
        };
    }

    public static Specification<Venda> dataFimEquals(LocalDate dataFim) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(dataFim)) {
                return null;
            } else {
                return builder.lessThanOrEqualTo(root.get("dataCriacao"), dataFim);
            }
        };
    }
    /**
     * Verifica se o status da venda é diferente do status informado
     * @param strStatus Valor em String do status da venda para comparar.
     * @return Objeto specification caso o valor do status seja diferente do parametro.
     * @exception Caso o status informado seja inválido, gerará uma exceção.
     */
    public static Specification<Venda> statusNotEquals(String strStatus) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(strStatus)) {
                return null;
            } else {
                StatusVenda status = StatusVenda.valueOf(strStatus);
                return builder.notEqual(root.get("status"), status);
            }
        };
    }
}
