package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import samumene.erp_template.entity.desconto.DescontoProduto;

import java.util.List;

public interface DescontoProdutoRepository extends JpaRepository<DescontoProduto, Long> {

    List<DescontoProduto> findAllByProdutoId(Long idProduto);

}
