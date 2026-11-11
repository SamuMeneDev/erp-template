package samumene.erp_template.mapper.base;

import java.util.List;

/**
 * Interface que implementa a transformação de Endidade para DTO de Response.
 *
 * @param <E> Tipagem da entidade.
 * @param <D> Tipagem da DTO de response.
 */
public interface GetBaseMapper<E, D> {
    /**
     * Converte uma entidade do tipo {@link E} para sua DTO do tipo {@link D}.
     * @param entity Entidade.
     * @return DTO convertida para response.
     */
    D getParser(E entity);

    /**
     * Converte uma lista de entidades do tipo {@link E} para uma lista DTOs do tipo {@link D}.
     * @param entityList Lista de ntidades.
     * @return {@link List} de DTOs convertidas para response.
     */
    List<D> getEntityList(List<E> entityList);
}
