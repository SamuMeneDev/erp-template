package samumene.erp_template.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import samumene.erp_template.configuration.DateTimeConfig;
import samumene.erp_template.dto.request.venda.SelecaoVendaCreateRequest;
import samumene.erp_template.dto.request.venda.VendaCreateRequest;
import samumene.erp_template.dto.response.venda.VendaDashboardDia;
import samumene.erp_template.dto.response.venda.VendaDashboardResponse;
import samumene.erp_template.dto.response.venda.VendaPrecificacaoDashboardResponse;
import samumene.erp_template.dto.response.venda.VendaResponse;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.Precificacao;
import samumene.erp_template.entity.SelecaoVenda;
import samumene.erp_template.entity.Venda;
import samumene.erp_template.entity.insumo.Insumo;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.enumeration.StatusVenda;
import samumene.erp_template.error.exceptions.BusinessException;
import samumene.erp_template.filter.FilterExecutor;
import samumene.erp_template.mapper.PrecificacaoMapper;
import samumene.erp_template.mapper.VendaMapper;
import samumene.erp_template.repository.PrecificacaoRepository;
import samumene.erp_template.repository.ProdutoRepository;
import samumene.erp_template.repository.VendaRepository;
import samumene.erp_template.service.domain.PricingCalculator;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VendaService {

    // Dependências
    private final VendaRepository vendaRepository;
    private final PrecificacaoRepository precificacaoRepository;
    private final PrecificacaoMapper precificacaoMapper;
    private final ProdutoRepository produtoRepository;
    private final PrecoProdutoService precoProdutoService;
    private final PricingCalculator calculator;
    private final VendaMapper vendaMapper;

    // Injeção de dependências
    public VendaService(VendaRepository vendaRepository, PrecificacaoRepository precificacaoRepository, PrecificacaoMapper precificacaoMapper, ProdutoRepository produtoRepository, PrecoProdutoService precoProdutoService, PricingCalculator calculator, VendaMapper vendaMapper) {
        this.vendaRepository = vendaRepository;
        this.precificacaoRepository = precificacaoRepository;
        this.precificacaoMapper = precificacaoMapper;
        this.produtoRepository = produtoRepository;
        this.precoProdutoService = precoProdutoService;
        this.calculator = calculator;
        this.vendaMapper = vendaMapper;
    }

    @Transactional
    public void venda(VendaCreateRequest request) {
        // Busca a precificação informada
        Precificacao precificacao = this.precificacaoRepository
                .findById(request.precificacaoId())
                .orElseThrow(()->new NoSuchElementException("Precificação não encontrada"));

        Venda venda = new Venda();

        venda.setPrecificacao(precificacao);

        // Busca todos os produtos pelos id's
        List<Long> idProdutos = request.selecoesVenda().stream()
                .map(SelecaoVendaCreateRequest::produtoId)
                .toList();

        List<Produto> todosProdutos = this.produtoRepository.findAllById(idProdutos);

        if(todosProdutos.size() != idProdutos.size()) {
            throw new NoSuchElementException("Produto não encontrado");
        }


        venda.adicionarItens(todosProdutos, request.selecoesVenda());

        this.alterarQuantidadeVenda(venda, true);


        /*
         * [Calculo do valor de venda]
         *
         * Calculo da somatória dos valores de venda dos produtos das seleções vezes a quantidade,
         * e ja descontando os descontos individuais de cada produto.
         */
        double valorVendaTotalBruto = venda.getSelecoesVenda().stream()
                .mapToDouble(sl->{
                    double valorVendaProduto = this.calcularValorVendaProduto(this.calculator, sl.getProduto());
                    double subtotalDescontoProduto = this.precoProdutoService
                            .calculoDescontosProduto(sl.getProduto(), valorVendaProduto);

                    return (valorVendaProduto - subtotalDescontoProduto) * sl.getQuantidade();
                })
                .sum();
        venda.setValorVendaTotal(valorVendaTotalBruto);

        // Descontar os descontos globais, precificação e do produto.
        double subTotalDesconto = 0.0;

        // Somando os descontos globais
        subTotalDesconto += this.precoProdutoService
                .calculoDescontosGlobais(valorVendaTotalBruto);

        // Somando descontos da precificação
        subTotalDesconto += this.precoProdutoService
                .calculoDescontosPrecificacao(venda.getPrecificacao(), valorVendaTotalBruto);

        venda.setFaturamentoLiquido(valorVendaTotalBruto - subTotalDesconto);

        double subTotalCustoMaterial = venda.getSelecoesVenda().stream()
                .mapToDouble(sl-> sl.getQuantidade() * this.calculator.calcularCustoMaterial(sl.getProduto().getComponentes()))
                .sum();

        venda.setLucroLiquido(venda.getFaturamentoLiquido() - subTotalCustoMaterial);

        this.vendaRepository.save(venda);
    }

    @Transactional
    public void cancelarVenda(Long id) {
        Venda venda = this.vendaRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Venda não encontrada"));

        venda.setStatus(venda.getStatus()==StatusVenda.VENDIDA?StatusVenda.CANCELADA:StatusVenda.VENDIDA);

        this.vendaRepository.save(venda);
    }

    @Transactional
    public void delete(Long id) {
        Venda venda = this.vendaRepository.findById(id)
                .orElseThrow(()->new NoSuchElementException("Venda não encontrada"));

        this.alterarQuantidadeVenda(venda, false);


        this.vendaRepository.deleteById(id);
    }

    /**
     * Metodo que busca e processa os dados de vendas do dia da busca e na semana, para uso na dashboard
     * do sistema
     * @param filter Filtros de busca
     * @return Resposta com dados tratados.
     */
    public VendaDashboardResponse processarDashboardVenda(FilterExecutor<Venda> filter) {
        List<Venda> vendasBusca = this.vendaRepository.findAll(filter.toSpecifications())
            .stream()
            .filter(v->v.getStatus()!=StatusVenda.CANCELADA)
            .toList();

        // Garante data do Brasil, caso o servidor tenha o fuso horário do exterior.
        LocalDate hojeBr = DateTimeConfig.getDate();

        double fatLiquidoSemana = vendasBusca.stream()
                .mapToDouble(Venda::getFaturamentoLiquido)
                .sum();

        double fatLiquidoDia = vendasBusca.stream()
                .filter(v->v.getDataCriacao().toLocalDate().isEqual(hojeBr))
                .mapToDouble(Venda::getFaturamentoLiquido)
                .sum();

        double lucroLiquidoSemana = vendasBusca.stream()
                .mapToDouble(Venda::getLucroLiquido)
                .sum();

        double lucroLiquidoDia = vendasBusca.stream()
                .filter(v->v.getDataCriacao().toLocalDate().isEqual(hojeBr))
                .mapToDouble(Venda::getLucroLiquido)
                .sum();



        Map<Precificacao, Long> quantPrecSem = vendasBusca.stream()
                .collect(Collectors.groupingBy(Venda::getPrecificacao, Collectors.counting()));

        Map<Precificacao, Long> quantPrecDia = vendasBusca.stream()
                .filter(v->v.getDataCriacao().toLocalDate().isEqual(hojeBr))
                .collect(Collectors.groupingBy(Venda::getPrecificacao, Collectors.counting()));

        Map<LocalDate, Long> quantVendasDia = vendasBusca.stream()
                .collect(Collectors.groupingBy(v->v.getDataCriacao().toLocalDate(), Collectors.counting()));



        // Inserção dos DTOS
        List<VendaPrecificacaoDashboardResponse> precificacoesDia = new ArrayList<>();
        List<VendaPrecificacaoDashboardResponse> precificacoesSemana = new ArrayList<>();



        quantPrecSem.forEach((p, q)->precificacoesSemana
                .add(new VendaPrecificacaoDashboardResponse(this.precificacaoMapper.getParser(p), q.intValue())));

        quantPrecDia.forEach((p, q)->precificacoesDia
                .add(new VendaPrecificacaoDashboardResponse(this.precificacaoMapper.getParser(p), q.intValue())));

        List<VendaDashboardDia> vendasSemana = new ArrayList<>();

        for(int i=0; i<7; i++) {
                // Variável para iterar todas as datas dos próximos 7 dias
                LocalDate itData = hojeBr.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY)).plusDays(i);

                if(quantVendasDia.containsKey(itData)) {
                        vendasSemana.add(new VendaDashboardDia(itData, quantVendasDia.get(itData).intValue()));
                } else {
                        vendasSemana.add(new VendaDashboardDia(itData, 0));
                }
        }

        return new VendaDashboardResponse(lucroLiquidoSemana,
                lucroLiquidoDia, fatLiquidoSemana, fatLiquidoDia,
                vendasSemana, precificacoesDia, precificacoesSemana);
    }

    public Page<VendaResponse> findAll(Pageable pageable) {
        return this.vendaRepository.findAll(pageable)
                .map(this.vendaMapper::getParser);
    }


    /**
     * Metodo utilitário para calcular o valor de venda do produto -- encapsulando a lógica.
     * @param calculator Implementação da interface de calculo do valor de venda.
     * @param p Objeto do produto a ser calculado.
     * @return Retorna o valor do valor de venda do produto.
     */
    private Double calcularValorVendaProduto(PricingCalculator calculator, Produto p) {
        Double custoMaterial = calculator.calcularCustoMaterial(p.getComponentes());
        return calculator.calcularValorVendaBase(custoMaterial, p.getMarkup());
    }

    /**
     * Metodo que, dada uma venda, desconta ou acrescenta nas quantidades atuais dos produtos e insumos.
     *
     * @param venda Venda que será iterarada.
     * @param descontar Se for {@code true}, irá ser descontado da quantidade atual de produtos e insumos dessa venda.
     * Se for {@code false}, irá ser devolvido (acrescentado) na quantidade atual de produtos e seus
     * respectivos insumos.
     */
    private void alterarQuantidadeVenda(Venda venda, boolean descontar) {
        for(SelecaoVenda itemReq : venda.getSelecoesVenda()) {
            Produto produto = itemReq.getProduto();
            if((produto.getQuantAtual() < itemReq.getQuantidade()) && descontar) {
                throw new BusinessException("Estoque insuficiente para o produto: "+produto.getNome());
            }
            produto.setQuantAtual(
                    descontar ? produto.getQuantAtual() - itemReq.getQuantidade()
                    : produto.getQuantAtual() + itemReq.getQuantidade()
            );

            if(produto.getComponentes() != null) {
                for(Componente componente : produto.getComponentes()) {
                    Insumo insumo = componente.getInsumo();

                    if(insumo != null) {
                        int quantUsadaInsumo = componente.getQuantidade() * itemReq.getQuantidade();
                        if((insumo.getQuantAtual() < quantUsadaInsumo) && descontar) {
                            throw new BusinessException("Estoque insuficiente para o insumo: "+insumo.getNome());
                        }
                        insumo.setQuantAtual(
                                descontar ? insumo.getQuantAtual() - quantUsadaInsumo
                                : insumo.getQuantAtual() + quantUsadaInsumo
                        );
                    }
                }
            }
        }
    }
}
