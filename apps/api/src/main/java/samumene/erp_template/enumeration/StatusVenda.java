package samumene.erp_template.enumeration;

public enum StatusVenda {
    VENDIDA,
    CANCELADA;

    /**
     * Expressão regular usada para validar status passado em requisições.
     */
    public static final String statusRegExp = "VENDIDA|CANCELADA";
}
