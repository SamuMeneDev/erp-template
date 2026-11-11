package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import samumene.erp_template.entity.insumo.CategoriaInsumo;

public interface CategoriaInsumoRepository extends JpaSpecificationExecutor<CategoriaInsumo>,
        JpaRepository<CategoriaInsumo, Long>{
    
}
