package samumene.erp_template.mapper.base;

import java.util.List;

/**
 * Interface com métodos conversores de DTO de requisição para sua entidade, com fim de perssistencia
 * ou aplicação de negócios.
 *
 * @param <E> Tipagem da entiade.
 * @param <D> Tipagem da DTO de requisição.
 */
public interface PostBaseMapper<E, D> {
    /**
     * Converte uma DTO para sua entidade.
     * @param dto DTO.
     * @return DTO convertida em Entidade.
     */
    E postParser(D dto);

    /**
     * Converte uma lista de DTOs do tipo {@link D} para uma lista de sua entidade {@link E}
     *
     * @param dtoList Lista de DTOs.
     * @return Lista de DTOs convertida em Lista de Entidade.
     */
    List<E> postParserlist(List<D> dtoList);

}
