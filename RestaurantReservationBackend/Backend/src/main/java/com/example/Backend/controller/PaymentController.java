package com.example.Backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.dto.CreateOrderRequest;
import com.example.Backend.dto.VerifyPaymentRequest;
import com.example.Backend.service.PaymentService;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(
            @RequestBody CreateOrderRequest request,
            Authentication authentication) throws Exception {

        return ResponseEntity.ok(
                paymentService.createOrder(request, authentication));
    }

    @PostMapping("/verify")
public ResponseEntity<?> verifyPayment(

        @RequestBody VerifyPaymentRequest request,

        Authentication authentication) throws Exception {

    return ResponseEntity.ok(
            paymentService.verifyPayment(
                    request,
                    authentication));
}
}