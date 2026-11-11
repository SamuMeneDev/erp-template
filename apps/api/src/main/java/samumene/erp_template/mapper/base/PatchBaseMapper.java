package samumene.erp_template.mapper.base;

import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * Converte DTOs de requisição de modificações, para sua entidade, com fim de perssistência,
 * ou aplicação de negócios.
 *
 * @param <E> Tipagem da Entidade.
 * @param <D> Tipagem da DTO de requisição.
 */
public interface PatchBaseMapper<E, D>{
    /**
     * Pega todas as modificações vindas da DTO e aplica na entidade (na mesma variável,
     * ponteiro, endereço de memória etc).
     *
     * @param dto DTO com as novas modificações.
     * @param entity Entidade já existente
     */
    void patchParser(D dto, @MappingTarget E entity);

    /**
     * Converte uma lista de DTOs do tipo {@link D} para uma lista de sua entidade {@link E}
     *
     * @param dtoList Lista de DTOs.
     * @return Lista de DTOs convertida em Lista de Entidade.
     */
    @Deprecated
    List<E> patchParserList(List<D> dtoList);
}
