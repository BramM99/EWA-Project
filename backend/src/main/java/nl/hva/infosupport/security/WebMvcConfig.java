package nl.hva.infosupport.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("Web CORS Registry updated.");
        registry.addMapping("/**").allowedOrigins("https://ewa-infosupport4-fe-app.herokuapp.com", "http://localhost:4200");
    }
}
