package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import samumene.erp_template.entity.produto.CategoriaProduto;

public interface CategoriaProdutoRepository extends JpaSpecificationExecutor<CategoriaProduto>,
        JpaRepository<CategoriaProduto, Long> {
    
}
