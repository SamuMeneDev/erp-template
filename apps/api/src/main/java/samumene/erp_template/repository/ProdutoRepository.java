package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import samumene.erp_template.entity.produto.Produto;

public interface ProdutoRepository extends JpaSpecificationExecutor<Produto>, JpaRepository<Produto, Long> {
    
}
