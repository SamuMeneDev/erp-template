package samumene.erp_template.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import samumene.erp_template.entity.Usuario;
import samumene.erp_template.entity.chamado.Chamado;

public interface ChamadoRepository extends JpaRepository<Chamado, Long> {
    List<Chamado> findAllByAutor(Usuario usuario);
}
