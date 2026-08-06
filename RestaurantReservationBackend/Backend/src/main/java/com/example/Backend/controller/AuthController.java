package com.example.Backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.dto.LoginRequest;
import com.example.Backend.dto.LoginResponse;
import com.example.Backend.dto.RegisterRequest;
import com.example.Backend.models.User;
import com.example.Backend.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/owner/register")
    public ResponseEntity<User> registerOwner(
            @RequestBody RegisterRequest request){

        return ResponseEntity.ok(authService.registerOwner(request));
    }

    @PostMapping("/customer/register")
    public ResponseEntity<User> registerCustomer(
            @RequestBody RegisterRequest request){

        return ResponseEntity.ok(authService.registerCustomer(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request){

        return ResponseEntity.ok(authService.login(request));
    }

}