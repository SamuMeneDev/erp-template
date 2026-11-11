package samumene.erp_template.annotation;

import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.AliasFor;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.annotation.*;

/**
 * Annotation que encapsula as configurações de seeders
 * usadas no ambiente de desenvolvimento.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Component
@Documented
@Profile("dev")
@Order
public @interface DevelopmentSeeder {
    /**
     * Ordem de execução do seeder
     */
    @AliasFor(annotation = Order.class, attribute = "value")
    int value() default org.springframework.core.Ordered.LOWEST_PRECEDENCE;
}
