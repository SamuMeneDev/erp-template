package samumene.erp_template.service.domain;

import org.springframework.stereotype.Component;

import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.desconto.Desconto;
import samumene.erp_template.enumeration.ETipoValorDesconto;

import java.util.List;

/**
 * Serviço de negócio que realiza as operações de calculo dos produtos.
 */
@Component
public class DefaultPricingCalculator implements PricingCalculator{

    @Override
    public Double calcularCustoMaterial(List<Componente> componentes) {
        if (componentes == null || componentes.isEmpty()) return 0.0;
        return componentes.stream()
            .filter(c -> c != null && c.getInsumo() != null && c.getQuantidade() != null)
            .mapToDouble(c -> {
                Double preco = c.getInsumo().getPreco();
                return (preco != null) ? preco * c.getQuantidade() : 0.0;
            })
            .sum();
    }

    @Override
    public Double calcularValorVendaBase(Double custoMaterial, Double markup) {
        if (markup == null || markup <= 0) return custoMaterial;
        return custoMaterial * markup;
    }

    @Override
    public Double calcularValorDescontoIndividual(Desconto desconto, Double valorVendaBase) {
        if (desconto == null || desconto.getValor() == null) return 0.0;

        if (desconto.getTipoValor() == ETipoValorDesconto.PORCENTAGEM) {
            return valorVendaBase * (desconto.getValor() / 100.0);
        }
        return desconto.getValor(); // Caso seja REAL
    }
}
