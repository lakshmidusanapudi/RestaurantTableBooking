package com.example.Backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.dto.PaymentConfigRequest;
import com.example.Backend.models.PaymentConfig;
import com.example.Backend.service.PaymentConfigService;

@RestController
@RequestMapping("/api/payment-config")
@CrossOrigin("*")
public class PaymentConfigController {

    private final PaymentConfigService paymentConfigService;

    public PaymentConfigController(
            PaymentConfigService paymentConfigService) {

        this.paymentConfigService = paymentConfigService;
    }

    @PostMapping
    public ResponseEntity<PaymentConfig> save(
            @RequestBody PaymentConfigRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentConfigService.saveConfig(
                        request,
                        authentication));
    }

    @GetMapping
    public ResponseEntity<PaymentConfig> get(
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentConfigService.getConfig(
                        authentication));
    }

    @PutMapping
    public ResponseEntity<PaymentConfig> update(
            @RequestBody PaymentConfigRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                paymentConfigService.updateConfig(
                        request,
                        authentication));
    }
}