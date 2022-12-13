package training;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;

import java.util.Optional;
import java.util.Properties;

@SpringBootApplication(exclude = {
        SecurityAutoConfiguration.class
}, scanBasePackages = "training")
public class App {

    private static final Optional<String> host;
    private static final Optional<String> port;
    private static final Properties appProps = new Properties();

    static {
        host = Optional.ofNullable(System.getenv("HOSTNAME"));
        port = Optional.ofNullable(System.getenv("PORT"));
    }

    public static void main( String[] args ) {

        // set application properties
        appProps.setProperty("server.address", host.orElse("localhost"));
        appProps.setProperty("server.port", port.orElse("8080"));

        SpringApplication app = new SpringApplication(App.class);
        app.setDefaultProperties(appProps);
        app.run(args);
    }
}
