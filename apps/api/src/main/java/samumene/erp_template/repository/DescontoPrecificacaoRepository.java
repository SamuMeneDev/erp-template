package samumene.erp_template.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import samumene.erp_template.entity.desconto.DescontoPrecificacao;

import java.util.List;

public interface DescontoPrecificacaoRepository extends JpaRepository<DescontoPrecificacao, Long> {
    /**
     * Consulta para buscar todos os descontos relacionados à uma
     * precificação e os globais (Descontos que o atributo {@code precificacao} é {@code null})
     * @param id Id da precificação.
     * @return @{@link List} de Descontos
     */
    @Query("SELECT d FROM DescontoPrecificacao d " +
            "LEFT JOIN d.precificacao p " +
            "WHERE p.id = :id OR p IS NULL")
    List<DescontoPrecificacao> findAllDescontoByPrecificacao(@Param("id") Long id);

    @Query("SELECT d FROM DescontoPrecificacao d " +
            "WHERE d.precificacao IS NULL")
    List<DescontoPrecificacao> findAllDescontoGlobal();
}
