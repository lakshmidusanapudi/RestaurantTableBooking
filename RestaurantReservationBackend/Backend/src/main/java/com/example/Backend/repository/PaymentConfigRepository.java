package com.example.Backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.models.PaymentConfig;

public interface PaymentConfigRepository
        extends MongoRepository<PaymentConfig, String> {

    Optional<PaymentConfig> findByRestaurantId(String restaurantId);

    boolean existsByRestaurantId(String restaurantId);

    Optional<PaymentConfig> findByRestaurantIdAndActiveTrue(
        String restaurantId);
}