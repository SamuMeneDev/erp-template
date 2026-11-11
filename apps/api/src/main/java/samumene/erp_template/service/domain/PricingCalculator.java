package samumene.erp_template.service.domain;

import java.util.List;

import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.desconto.Desconto;

/**
 * Interface com métodos para se aplicar as regras de calculo dos preços.
 */
public interface PricingCalculator {
    /**
     * Calcula o custo material de um produto.
     * @param componentes {@link List} com os componentes de um produto.
     * @return O custo material calculado.
     */
    Double calcularCustoMaterial(List<Componente> componentes);

    /**
     * Calcula o valor de venda baseado no markup do produto.
     * @param custoMaterial Valor do custo material do produto.
     * @param markup Valor do markup.
     * @return O valor de venda calculado.
     */
    Double calcularValorVendaBase(Double custoMaterial, Double markup);

    /**
     * Calcula o valor de desconto individualmente
     * @param desconto desconto a ser utilizado no calculo.
     * @param valorVendaBase Valor de venda de um produto.
     * @return Valor do desconto processado.
     */
    Double calcularValorDescontoIndividual(Desconto desconto, Double valorVendaBase);

}
