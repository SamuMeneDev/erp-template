package samumene.erp_template.seeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public abstract class BaseSeeder implements CommandLineRunner {

    @Autowired
    protected MockReader mockReader;

    @Override
    public void run(String... args) throws Exception {
        executarSeeding();
    }

    protected abstract void executarSeeding() throws Exception;
}
