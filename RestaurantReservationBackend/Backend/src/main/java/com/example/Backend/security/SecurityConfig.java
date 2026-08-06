package com.example.Backend.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;
   

    @Bean
    public UserDetailsService userDetailsService() {
        return userDetailsService;
    }

  

@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}
  @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {

    http

        .cors(cors -> cors.configurationSource(corsConfigurationSource()))

        .csrf(AbstractHttpConfigurer::disable)

        .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ======================
                        // PUBLIC
                        // ======================

                        .requestMatchers("/api/auth/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/tables/**").permitAll()

                        // ======================
                        // SUPER ADMIN
                        // ======================

                        .requestMatchers("/api/superadmin/**")
                        .hasRole("SUPER_ADMIN")

                        // ======================
                        // RESTAURANT OWNER
                        // ======================

                        .requestMatchers("/api/owner/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.POST, "/api/restaurants/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.PUT, "/api/restaurants/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.DELETE, "/api/restaurants/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.POST, "/api/tables/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.PUT, "/api/tables/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers(HttpMethod.DELETE, "/api/tables/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers("/api/bookings/owner/**")
                        .hasRole("RESTAURANT_OWNER")

                        .requestMatchers("/api/payment-config/**")
                        .hasRole("RESTAURANT_OWNER")

                        // ======================
                        // CUSTOMER
                        // ======================

                        .requestMatchers(HttpMethod.POST, "/api/bookings")
                        .hasRole("CUSTOMER")

                        .requestMatchers("/api/bookings/my/**")
                        .hasRole("CUSTOMER")

                        .requestMatchers("/api/bookings/cancel/**")
                        .hasRole("CUSTOMER")

                        .requestMatchers("/api/payment/**")
                        .hasRole("CUSTOMER")

                        // ======================

                        .anyRequest().authenticated()

                )

                .authenticationProvider(authenticationProvider())

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
   provider.setPasswordEncoder(passwordEncoder()); 
    return provider;
}

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(List.of("http://localhost:3000"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS"));
    configuration.setAllowedHeaders(List.of("*"));
    configuration.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

}