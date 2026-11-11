package samumene.erp_template.enumeration;

/**
 * Enumeração com os status de um Chamado da aplicação.
 */
public enum StatusChamado {
    PENDENTE,
    EM_ANDAMENTO,
    CONCLUIDO;

    /**
     * Constante usada para validação em DTOs de requisição com expressões regulares
     */
    public static final String statusRegExp = "PENDENTE|EM_ANDAMENTO|CONCLUIDO";

}
