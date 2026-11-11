package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import samumene.erp_template.entity.Venda;

public interface VendaRepository extends
        JpaRepository<Venda, Long>,
        JpaSpecificationExecutor<Venda> {
}
