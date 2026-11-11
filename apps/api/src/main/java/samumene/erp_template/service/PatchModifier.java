package samumene.erp_template.service;

import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;

/**
 * @deprecated Implemente os métodos da interface {@link samumene.erp_template.mapper.base.PatchBaseMapper} no lugar.
 * Interface que executa as verificações para mudanças com o metodo HTTP PATCH.
 */
@Deprecated
public interface PatchModifier {
    /**
     * Interface que faz as modificação com base apenas nos atributos
     * passados, como no metodo PATCH.
     *
     * @param entity Entidade existente.
     * @param requestBody Entidade que representa os novos valores a serem adicionados
     * @return A Entidade existente com os campos passados alterados.
     * @param <E> Tipo da entidade.
     */
    @Deprecated
    static <E> E patchEntity(E entity, E requestBody) {
        // Classe (Tipo) base da hierarquia, ultima subclasse da árvore de herança.
        Class<?> currentClass = requestBody.getClass();

        // Enquanto tiver uma superclasse a cima, e se a superclasse não for Object...
        // Faz a verificação nos campos da classe atual
        while (currentClass != null && currentClass != Object.class) {
            Field[] fields = currentClass.getDeclaredFields();

            for(Field field : fields) { // Pra cada atributo no objeto...
                ReflectionUtils.makeAccessible(field); // Deixa acessível para modificação.
                Object value = ReflectionUtils.getField(field, requestBody);
                if(value != null) { // Se o campo não for null
                    ReflectionUtils.setField(field, entity, value);
                }
            }

            // Vai para a próxima superclasse, diferente de Object, se existente.
            currentClass = currentClass.getSuperclass();
        }

        return entity; // Entidade modificada.
    }
}
