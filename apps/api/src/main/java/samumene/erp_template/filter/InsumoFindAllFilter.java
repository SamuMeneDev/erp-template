package samumene.erp_template.filter;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.insumo.Insumo;

import org.springframework.data.jpa.domain.Specification;

import static samumene.erp_template.specification.GeneralSpec.dataFimEquals;
import static samumene.erp_template.specification.GeneralSpec.dataInicioEquals;
import static samumene.erp_template.specification.InsumoSpec.nomeContains;

import java.time.LocalDateTime;


@Getter @Setter
public class InsumoFindAllFilter implements FilterExecutor<Insumo> {

    private String nome;
    private Double preco;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataFim;
    private Integer quantMinima = 0;
    private Integer quantAtual = 0;

    @Override
    public Specification<Insumo> toSpecifications() {
        return Specification.where(nomeContains(nome))
                .and(dataFimEquals(dataFim))
                .and(dataInicioEquals(dataInicio));
    }
}
