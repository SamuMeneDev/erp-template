package samumene.erp_template.dto.response.venda;

import java.time.LocalDate;

public record VendaDashboardDia (
    LocalDate dia,
    Integer quantidade
) {}
