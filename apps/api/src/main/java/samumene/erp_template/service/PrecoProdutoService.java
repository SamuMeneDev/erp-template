package samumene.erp_template.service;

import org.springframework.stereotype.Service;

import samumene.erp_template.dto.response.PrecificacaoValorVendaResponse;
import samumene.erp_template.entity.Precificacao;
import samumene.erp_template.entity.desconto.DescontoPrecificacao;
import samumene.erp_template.entity.desconto.DescontoProduto;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.mapper.PrecificacaoMapper;
import samumene.erp_template.repository.DescontoPrecificacaoRepository;
import samumene.erp_template.repository.DescontoProdutoRepository;
import samumene.erp_template.repository.PrecificacaoRepository;
import samumene.erp_template.repository.ProdutoRepository;
import samumene.erp_template.service.domain.PricingCalculator;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class PrecoProdutoService {

    // Dependências
    private final ProdutoRepository produtoRepository;
    private final PricingCalculator calculator;
    private final DescontoPrecificacaoRepository descontoPrecificacaoRepository;
    private final DescontoProdutoRepository descontoProdutoRepository;
    private final PrecificacaoRepository precificacaoRepository;
    private final PrecificacaoMapper precificacaoMapper;

    // Injeção de dependências
    public PrecoProdutoService(ProdutoRepository produtoRepository, PricingCalculator calculator, DescontoPrecificacaoRepository descontoPrecificacaoRepository, DescontoProdutoRepository descontoProdutoRepository, PrecificacaoRepository precificacaoRepository, PrecificacaoMapper precificacaoMapper) {
        this.produtoRepository = produtoRepository;
        this.calculator = calculator;
        this.descontoPrecificacaoRepository = descontoPrecificacaoRepository;
        this.descontoProdutoRepository = descontoProdutoRepository;
        this.precificacaoRepository = precificacaoRepository;
        this.precificacaoMapper = precificacaoMapper;
    }

    /**
     * Busca, e organiza todos os valore de venda, lucro em todas as precificações.
     * @param idProduto Id único do produto.
     * @return {@link List} com todos os preço do produto em cada precificação.
     */
    public List<PrecificacaoValorVendaResponse> findAllPreco(Long idProduto) {
        Produto produto = this.produtoRepository.findById(idProduto)
                .orElseThrow(() -> new NoSuchElementException("Produto não encontrado"));

        // 1. Cálculos base do produto
        Double custoMaterial = this.calculator.calcularCustoMaterial(produto.getComponentes());
        Double valorVendaBase = this.calculator.calcularValorVendaBase(custoMaterial, produto.getMarkup());

        // 2. Busca de descontos e precificações
        List<Precificacao> precificacoes = this.precificacaoRepository.findAll();
        List<DescontoPrecificacao> todosDescontosPrecificacao = this.descontoPrecificacaoRepository.findAll();

        // 3. Agrupamento dos descontos por Precificação ID (Globais ficam na chave -1L)
        Map<Long, List<DescontoPrecificacao>> descontosPorPrecificacao = todosDescontosPrecificacao.stream()
                .collect(Collectors.groupingBy(dp -> dp.getPrecificacao() != null ? dp.getPrecificacao().getId() : -1L));

        // 4. Pré-calcula os descontos fixos (Descontos do Produto + Descontos Globais) FORA do loop das precificações
        Double descontosDoProdutoAcumulado = this.calculoDescontosProduto(idProduto, valorVendaBase);

        Double descontosGlobaisAcumulado = this.calculoDescontosGlobais(descontosPorPrecificacao, valorVendaBase);

        // Base fixa de desconto comum a todas as precificações
        Double subtotalDescontosFixos = descontosDoProdutoAcumulado + descontosGlobaisAcumulado;

        // 5. Mapeia e constrói a lista de respostas de forma funcional
        return precificacoes.stream()
                .map(prec -> {
                    // Filtra apenas os descontos específicos desta precificação e calcula o total
                    Double descontosEspecificosAcumulado = descontosPorPrecificacao.getOrDefault(prec.getId(), List.of()).stream()
                            .mapToDouble(dp -> this.calculator.calcularValorDescontoIndividual(dp, valorVendaBase))
                            .sum();

                    // Total de descontos = (Produto + Globais) + Especificos desta precificação
                    Double totalDescontos = subtotalDescontosFixos + descontosEspecificosAcumulado;

                    Double lucroLiquido = valorVendaBase - custoMaterial - totalDescontos;
                    Double margemLiquida = valorVendaBase > 0 ? (lucroLiquido / valorVendaBase) : 0.0;

                    return new PrecificacaoValorVendaResponse(
                            this.precificacaoMapper.getParser(prec),
                            valorVendaBase,
                            lucroLiquido,
                            margemLiquida
                    );
                })
                .toList(); // Java 16+ para simplificar o Collectors.toList()
    }


    /**
     * Calcula e soma os valores de descontos do produto.
     * Nessa implementação é fornecido o ID do produto, onde ele é buscado
     * seus descontos são calculados pelo seu valor de venda.
     *
     * @param produtoId Id do produto
     * @param valorVendaProduto Valor de venda do produto
     * @apiNote O valor de venda nesse metodo é ESPECIFICO do PRODUTO
     * @return Valor da somatória dos descontos do produto.
     */
    public double calculoDescontosProduto(Long produtoId, Double valorVendaProduto) {
        List<DescontoProduto> descontosProduto = this.descontoProdutoRepository.findAllByProdutoId(produtoId);

        return descontosProduto.stream()
                .mapToDouble(dp->this.calculator.calcularValorDescontoIndividual(dp, valorVendaProduto))
                .sum();

    }

    /**
     * Calcula e soma os valores de descontos de um produto.
     * Nessa implementação, o objeto do tipo {@link Produto} é passado no parâmetro,
     * e o calculo dos seus descontos é realizado.
     *
     * @param produto Objeto do produto.
     * @param valorVendaProduto valor de venda desse produto.
     * @return Retorna o valor da somatória de todos os descontos desse produto.
     */
    public double calculoDescontosProduto(Produto produto, Double valorVendaProduto) {
        return produto.getDescontosProduto().stream()
                .mapToDouble(dp->this.calculator.calcularValorDescontoIndividual(dp, valorVendaProduto))
                .sum();
    }

    /**
     * Implementação que calcula a somatória de descontos globais.
     * Nessa implementação é só informado o valor de venda base, o metodo busca e separa os descontos globais.
     * @apiNote Para o uso nos valores do produto (caso desse service), use o valor de venda do PRODUTO, caso use o metodo
     * para vendas, use o valor de venda TOTAL DA VENDA.
     * @param valorVenda Valor de venda base para o calculo.
     * @return Valor de todos os descontos globais somados.
     */
    public double calculoDescontosGlobais(Double valorVenda) {
        var todosDescontosPrecificacao = this.descontoPrecificacaoRepository.findAll();
        return todosDescontosPrecificacao.stream()
                .filter(dp->dp.getPrecificacao() == null)
                .mapToDouble(dp->this.calculator.calcularValorDescontoIndividual(dp, valorVenda))
                .sum();
    }

    /**
     * Calcula a somatória dos descontos de uma precificação.
     *
     * @param precificacao Objeto do tipo {@link Precificacao}
     * @param valorVenda Valor de venda, ou do produto, ou da venda total.
     * @return Resultado da somatória dos descontos da precificação.
     */
    public double calculoDescontosPrecificacao(Precificacao precificacao, Double valorVenda) {
        return precificacao.getDescontos().stream()
                .mapToDouble(d->this.calculator.calcularValorDescontoIndividual(d, valorVenda))
                .sum();
    }

    /**
     * Implementação que calcula a somatória de descontos globais.
     * Nessa implementação, é passado um dicionario com os descontos organizados por chaves que são dos id da precificação.
     * Os descontos globais tem a chave -1L
     *
     * @apiNote Para o uso nos valores do produto (caso desse service), use o valor de venda do PRODUTO, caso use o metodo
     * para vendas, use o valor de venda TOTAL DA VENDA.
     * @param valorVenda Valor de venda base para o calculo.
     * @return Valor de todos os descontos globais somados.
     */
    public double calculoDescontosGlobais(Map<Long, List<DescontoPrecificacao>> descontosPorPrecificacao, Double valorVenda) {
        return descontosPorPrecificacao.getOrDefault(-1L, List.of()).stream()
                .mapToDouble(dp->this.calculator.calcularValorDescontoIndividual(dp, valorVenda))
                .sum();
    }

}
