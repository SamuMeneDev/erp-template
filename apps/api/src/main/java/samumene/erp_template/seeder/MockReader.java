package samumene.erp_template.seeder;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Classe que lê arquivos json para mocks e teste em desenvolvimento.
 */
@Component
@Profile("dev")
public class MockReader {

    // Dependências
    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;

    // Injeção de dependências
    public MockReader(ResourceLoader resourceLoader, ObjectMapper objectMapper) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
    }

    /**
     * Lê um arquivo json de um mock e o converte para um POJO ou record;
     * @param path String com o caminho do diretório do arquivo.
     * @param targetClass Referência da classe da entidade. (.class)
     * @return Retorna o objeto convertido.
     * @param <E> Tipo da entidade que será retornada.
     * @throws IOException Tratamento de exceção.
     */
    public <E> E jsonToObject(String path, Class<E> targetClass) throws IOException {
        Resource resource = resourceLoader.getResource(path);

        return objectMapper.readValue(resource.getInputStream(), targetClass);
    }

    /**
     * Lê um arquivo json de um mock e o converte para uma {@link List} de POJO ou record;
     * @param path String com o caminho do diretório do arquivo.
     * @param targetClass Referência da classe da entidade. (.class)
     * @return Retorna o objeto convertido.
     * @param <E> Tipo da entidade que será retornada.
     * @throws IOException Tratamento de exceção.
     */
    public <E> List<E> jsonToObjectList(String path, Class<E[]> targetClass) throws IOException {
        Resource resource = resourceLoader.getResource(path);

        return Arrays.asList(objectMapper.readValue(resource.getInputStream(), targetClass));
    }
}
