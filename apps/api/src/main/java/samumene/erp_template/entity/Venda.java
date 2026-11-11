package samumene.erp_template.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.dto.request.venda.SelecaoVendaCreateRequest;
import samumene.erp_template.entity.produto.Produto;
import samumene.erp_template.enumeration.StatusVenda;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@NoArgsConstructor
@Getter @Setter
@Entity
@Audited
@SQLDelete(sql = "UPDATE venda SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'CANCELADA'")
public class Venda extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StatusVenda status = StatusVenda.VENDIDA;

    /**
     * Representa o valor de venda total computado no dia/período
     * desta venda.
     */
    private Double valorVendaTotal;

    /**
     * Representa o valor líquido da venda (faturamento líquido) computado no dia/período
     * desta venda.
     */
    private Double faturamentoLiquido;

    /**
     * Diferença entre faturamento líquido e despesas totais da venda.
     * [ ValorVenda - Outros Descontos - Custo Material ]
     */
    private Double lucroLiquido;

    // Relacionamentos

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SelecaoVenda> selecoesVenda = new ArrayList<>();

    @ManyToOne
    private Precificacao precificacao;

    /**
     * Metodo que pega uma lista de produtos (vindas de um processamento na service) e uma lista de produtos selecionado para venda
     * {@link SelecaoVendaCreateRequest} e dada a quantidade vendida, cria a
     * entidade concreta {@link SelecaoVenda} e de forma limpa, adiciona o produto e a quantidade vendida.
     *
     * @param produtos
     * @param requests
     */
    public void adicionarItens(List<Produto> produtos, List<SelecaoVendaCreateRequest> requests) {
        for (SelecaoVendaCreateRequest req : requests) {
            // Acha o produto correspondente na lista que veio do banco
            Produto produto = produtos.stream()
                    .filter(p -> p.getId().equals(req.produtoId()))
                    .findFirst()
                    .orElseThrow(() -> new NoSuchElementException("Produto não encontrado: " + req.produtoId()));

            // Cria a entidade de junção de forma limpa
            SelecaoVenda item = new SelecaoVenda();
            item.setVenda(this); // Seta o relacionamento de volta (Don't forget!)
            item.setProduto(produto);
            item.setQuantidade(req.quantidade());

            this.selecoesVenda.add(item);
        }
    }

}
