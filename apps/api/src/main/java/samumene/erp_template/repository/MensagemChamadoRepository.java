package samumene.erp_template.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import samumene.erp_template.entity.chamado.Chamado;
import samumene.erp_template.entity.chamado.MensagemChamado;

public interface MensagemChamadoRepository extends JpaRepository<MensagemChamado, Long> {
    Page<MensagemChamado> findAllByChamado(Chamado chamado, Pageable pageable);
}
