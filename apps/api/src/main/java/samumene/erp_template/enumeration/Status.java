package samumene.erp_template.enumeration;

/**
 * Enumeração que representa os possíveis status de um recursos no que diz
 * respeito à sua visibilidade.
 */
public enum Status {
    ATIVADO,
    DESATIVADO,
    EXCLUIDO;

    /**
     * Expressão regular usada para validar status passado em requisições.
     */
    public static final String statusRegExp = "ATIVADO|DESATIVADO";
}
