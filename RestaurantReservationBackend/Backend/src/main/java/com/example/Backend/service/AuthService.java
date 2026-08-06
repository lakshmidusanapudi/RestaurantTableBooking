package com.example.Backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Backend.dto.LoginRequest;
import com.example.Backend.dto.LoginResponse;
import com.example.Backend.dto.RegisterRequest;
import com.example.Backend.enums.Role;
import com.example.Backend.enums.Status;
import com.example.Backend.models.User;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.security.CustomUserDetails;
import com.example.Backend.security.CustomUserDetailsService;
import com.example.Backend.security.JwtService;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                   CustomUserDetailsService userDetailsService,
                   JwtService jwtService,
                   UserRepository userRepository,
                   PasswordEncoder passwordEncoder) {

    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtService = jwtService;
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}
   public LoginResponse login(LoginRequest request) {

    User user = userRepository.findByEmail(request.getEmail());

    if (user == null) {
        throw new RuntimeException("Invalid Email or Password");
    }

    if (user.getRole() == Role.RESTAURANT_OWNER &&
            user.getStatus() != Status.APPROVED) {

        throw new RuntimeException("Your account is waiting for Super Admin approval.");
    }

    authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getEmail(),
                    request.getPassword()
            )
    );

    CustomUserDetails userDetails =
            (CustomUserDetails) userDetailsService.loadUserByUsername(request.getEmail());

    String token = jwtService.generateToken(userDetails);

   return new LoginResponse(
        token,
        user.getRole().name(),
        String.valueOf(user.getId()),
        user.getName(),
        user.getEmail()
);
}
    public User registerOwner(RegisterRequest request){

    if(userRepository.findByEmail(request.getEmail()) != null){
        throw new RuntimeException("Email already exists");
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    user.setRole(Role.RESTAURANT_OWNER);
    user.setStatus(Status.PENDING);

    return userRepository.save(user);
}

public User registerCustomer(RegisterRequest request){

    if(userRepository.findByEmail(request.getEmail()) != null){
        throw new RuntimeException("Email already exists");
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPhone(request.getPhone());
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    user.setRole(Role.CUSTOMER);
    user.setStatus(Status.APPROVED);

    return userRepository.save(user);
}

}