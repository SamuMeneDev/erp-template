package samumene.erp_template.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class GeneralSpec {

    public static <T> Specification<T> dataInicioEquals(LocalDateTime dataInicio) {
        return (root, query, builder) -> {
            if(ObjectUtils.isEmpty(dataInicio)) {
                return null;
            } else {
                return builder.greaterThanOrEqualTo(root.get("dataCriacao"), dataInicio);
            }
        };
    }

    public static <T> Specification<T> dataFimEquals(LocalDateTime dataFim) {
        return (root, query, builder) -> {
            if (ObjectUtils.isEmpty(dataFim)) {
                return null;
            } else {
                LocalDateTime dataFimAjustada = dataFim.toLocalDate().atTime(LocalTime.MAX);
                return builder.lessThanOrEqualTo(root.get("dataCriacao"), dataFimAjustada);
            }
        };
    }


}
