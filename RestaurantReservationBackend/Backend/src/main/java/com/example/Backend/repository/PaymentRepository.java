package com.example.Backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.models.Payment;

public interface PaymentRepository extends MongoRepository<Payment, String> {

}