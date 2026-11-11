package samumene.erp_template.enumeration;

/**
 * Enumeração com os tipos de valor aceitos para adicionar um desconto na aplicação.
 */
public enum ETipoValorDesconto {
    REAL,
    PORCENTAGEM;
    public static final String tipoRegExp = "REAL|PORCENTAGEM";
}
