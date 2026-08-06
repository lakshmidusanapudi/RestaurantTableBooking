package com.example.Backend.security;

import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.example.Backend.models.User;
import com.example.Backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }

        return new CustomUserDetails(user);
    }

}