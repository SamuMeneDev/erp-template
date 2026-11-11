package samumene.erp_template.configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * Classe com métodos utilitário para definição correta de data e hora.
 */
public class DateTimeConfig {

    /**
     * Fuso Horário de America São Paulo, padrão do projeto.
     */
    public static final String ZONE_ID = "America/Sao_Paulo";

    public static LocalDateTime getDateTime() {
        return LocalDateTime.now(ZoneId.of(ZONE_ID));
    }

    public static LocalDate getDate() {
        return LocalDate.now(ZoneId.of(ZONE_ID));
    }

}
