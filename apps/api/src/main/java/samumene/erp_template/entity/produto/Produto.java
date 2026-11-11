package samumene.erp_template.entity.produto;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import samumene.erp_template.entity.Auditable;
import samumene.erp_template.entity.Componente;
import samumene.erp_template.entity.SelecaoVenda;
import samumene.erp_template.entity.desconto.DescontoProduto;
import samumene.erp_template.enumeration.Status;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;
import org.hibernate.envers.Audited;

/**
 * Entidade que representa os produtos do sistema.
 */
@Entity
@Audited
@Getter @Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE produto SET excluido = true WHERE id = ?")
@SQLRestriction("excluido = false AND status <> 'DESATIVADO'")
public class Produto extends Auditable {

    /**
     * Id único do produto
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nome do produto
     */
    @Column(nullable = false)
    private String nome;

    /**
     * Código usado para cada produto.
     */
    private String codigo;

    /**
     * Descrição opcional do produto.
     */
    @Column (columnDefinition = "TEXT")
    private String descricao;

    /**
     * Status do produto.
     */
    @Enumerated(EnumType.STRING)
    private Status status = Status.ATIVADO;

    /**
     * Quantidade mínima necessária no estoque para esse produto.
     */
    private Integer quantMinima;

    /**
     * Quantidade atual desse produto no estoque.
     */
    private Integer quantAtual;

    /**
     * Valor que é usado para cambear (balancear), o valor de venda do produto.
     * @apiNote Por padrão vem como 1.0 para não comprometer o calculo dos preços.
     */
    private Double markup = 1.0;
    /**
     * Produto do custo material com o markup da precificação.
     * @apiNote Esse valor é definido pelo produto do custo material com o markup da precificação.
     */
    @Transient
    private Double valorVenda;
    /**
     * Custo material do produto.
     * @apiNote Esse valor é definido pela somatória de todos os
     * insumos desse produto.
     */
    @Transient
    private Double custoMaterial;

    /**
     * Url para foto do produto.
     */
    private String urlFoto;

    // Relacionamentos
    @OneToMany(mappedBy = "produto", cascade = CascadeType.REMOVE)
    @SQLRestriction("excluido = false AND EXISTS (SELECT 1 FROM insumo i WHERE i.id = insumo_id AND i.excluido = false)")
    private List<Componente> componentes;

    @OneToMany(mappedBy = "produto")
    private List<SelecaoVenda> selecoesVenda;

    /**
     * Categoria do produto.
     */
    @ManyToOne
    @OnDelete(action = OnDeleteAction.SET_NULL)
    private CategoriaProduto categoria;

    /**
     * Descontos aplicados á um produto individualmente.
     */
    @OneToMany(mappedBy = "produto")
    private List<DescontoProduto> descontosProduto;
}