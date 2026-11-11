package samumene.erp_template.filter;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.produto.CategoriaProduto;

import org.springframework.data.jpa.domain.Specification;

import static samumene.erp_template.specification.CategoriaProdutoSpec.nomeContains;
import static samumene.erp_template.specification.GeneralSpec.dataFimEquals;
import static samumene.erp_template.specification.GeneralSpec.dataInicioEquals;

import java.time.LocalDateTime;

@Getter @Setter 
public class CategoriaProdutoFindAllFilter implements FilterExecutor<CategoriaProduto> {
    private String nome;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataFim;

    @Override
    public Specification<CategoriaProduto> toSpecifications() {
        return Specification.where(nomeContains(nome))
                .and(dataInicioEquals(dataInicio))
                .and(dataFimEquals(dataFim));
    }
}
