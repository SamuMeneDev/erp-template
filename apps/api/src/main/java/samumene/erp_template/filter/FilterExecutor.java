package samumene.erp_template.filter;

import org.springframework.data.jpa.domain.Specification;

/**
 * Interface usada por uma implementador que tem filtros de buscas a serem aplicados.
 * @param <T> Tipo da entidade que será feita as filtragens.
 */
public interface FilterExecutor<T> {

    /**
     *  Metodo que agrega todos os filtros a serem adicionados e acrescentados em uma busca.
     *
     * @return Objeto do tipo {@link Specification}, que tem as regras de filtragem para
     * a busca.
     */
    public Specification<T> toSpecifications();
}
