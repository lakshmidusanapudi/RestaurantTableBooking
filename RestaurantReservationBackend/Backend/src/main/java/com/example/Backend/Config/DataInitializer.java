package com.example.Backend.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Backend.enums.Role;
import com.example.Backend.enums.Status;
import com.example.Backend.models.User;
import com.example.Backend.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if (!userRepository.existsByEmail("superadmin@restaurant.com")) {

            User admin = new User();

            admin.setName("Super Admin");
            admin.setEmail("superadmin@restaurant.com");
            admin.setPhone("9876543210");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.SUPER_ADMIN);
            admin.setStatus(Status.APPROVED);

            userRepository.save(admin);

            System.out.println("✅ Super Admin Created Successfully");
        } else {
            System.out.println("✅ Super Admin Already Exists");
        }
    }
}