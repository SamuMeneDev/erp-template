import type { Desconto } from "@erp-template/types";

/**
 * Classe com funções utilitárias dos sistemas.
 */
export class Functions {
    /**
     * Função que formata um valor em reais para exibição do usuário
     * @param value Valor em reais (R$)
     */
    static currencyFormat(value: number) {
        const numberFormat = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value);
        return numberFormat;
    }

    /**
     * Recebe um objeto desconto vindo da API e o transforma em um texto formatado de acordo com seu valor.
     * @param desconto Objeto desconto vindo da API
     * @returns Texto formatado do desconto.
     */
    static descontoFormat(desconto: Desconto) {
        if(desconto.tipoValor == "REAL") {
            return this.currencyFormat(desconto.valor)
        } else {
            return `${desconto.valor}%`;
        }
    }

    /**
     * Converte números com virgula para o padrão da computação (com ponto),
     * e para number.
     * 
     * @param val Entrada de um valor com virgula ou string de valor float.
     * @returns Valor covertido para number e a devida acentuação com ponto.
     */
    static floatFormat(val: string | number | unknown) {
        if(typeof val === "string") {
            const format = val.replace(",", ".");
            return format === "" ? undefined : Number(format);
        }
        return val;
    }


    static dateTimeFormat(dateTime: string) {
        const data = new Date(dateTime);
        
        return `${data.toLocaleDateString("pt-BR", {
                timeZone: "America/Sao_Paulo",
            })} ${data.toLocaleTimeString("pt-BR",{
            })}`
    }
}