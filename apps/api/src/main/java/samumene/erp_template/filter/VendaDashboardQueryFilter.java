package samumene.erp_template.filter;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.configuration.DateTimeConfig;
import samumene.erp_template.entity.Venda;
import samumene.erp_template.enumeration.StatusVenda;

import org.springframework.data.jpa.domain.Specification;

import static samumene.erp_template.specification.VendaDashboardSpec.dataFimEquals;
import static samumene.erp_template.specification.VendaDashboardSpec.dataInicioEquals;
import static samumene.erp_template.specification.VendaDashboardSpec.statusNotEquals;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@Getter @Setter
public class VendaDashboardQueryFilter implements FilterExecutor<Venda> {

    private static LocalDate hojeBr = DateTimeConfig.getDate();

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataInicio = hojeBr.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataFim = hojeBr.plusDays(7);

    @Override
    public Specification<Venda> toSpecifications() {
        return Specification.where(dataInicioEquals(dataInicio))
                .and(dataFimEquals(dataFim))
                .and(statusNotEquals(StatusVenda.CANCELADA.name()));
    }
}
