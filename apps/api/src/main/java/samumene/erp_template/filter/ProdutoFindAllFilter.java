package samumene.erp_template.filter;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import samumene.erp_template.entity.produto.CategoriaProduto;
import samumene.erp_template.entity.produto.Produto;

import org.springframework.data.jpa.domain.Specification;

import static samumene.erp_template.specification.GeneralSpec.dataFimEquals;
import static samumene.erp_template.specification.GeneralSpec.dataInicioEquals;
import static samumene.erp_template.specification.ProdutoSpec.codigoContains;
import static samumene.erp_template.specification.ProdutoSpec.nomeContains;

import java.time.LocalDateTime;

@Getter @Setter
public class ProdutoFindAllFilter implements FilterExecutor<Produto> {


    private String nome;
    private String codigo;

    private CategoriaProduto categoria;
    private Integer quantMinima;
    private Integer quantAtual;

    private Double markup = 1.0;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataInicio;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataFim;

    @Override
    public Specification<Produto> toSpecifications() {
        return Specification.where(codigoContains(codigo))
                .and(nomeContains(nome))
                .and(dataFimEquals(dataFim))
                .and(dataInicioEquals(dataInicio));
    }
}
