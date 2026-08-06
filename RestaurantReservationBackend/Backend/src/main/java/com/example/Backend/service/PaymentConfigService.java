package com.example.Backend.service;

import com.example.Backend.dto.PaymentConfigRequest;
import com.example.Backend.models.PaymentConfig;
import com.example.Backend.models.Restaurant;
import com.example.Backend.models.User;
import com.example.Backend.repository.PaymentConfigRepository;
import com.example.Backend.repository.RestaurantRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
public class PaymentConfigService {

private final PaymentConfigRepository paymentConfigRepository;
private final RestaurantRepository restaurantRepository;
private final UserRepository userRepository;

public PaymentConfigService(
        PaymentConfigRepository paymentConfigRepository,
        RestaurantRepository restaurantRepository,
        UserRepository userRepository) {

    this.paymentConfigRepository = paymentConfigRepository;
    this.restaurantRepository = restaurantRepository;
    this.userRepository = userRepository;
}
public PaymentConfig saveConfig(
        PaymentConfigRequest request,
        Authentication authentication) {

    String email = authentication.getName();

    User owner = userRepository.findByEmail(email);

    if (owner == null)
        throw new RuntimeException("Owner not found");

    Restaurant restaurant = restaurantRepository
            .findByOwnerId(owner.getId())
            .orElseThrow(() ->
                    new RuntimeException("Restaurant not found"));

    if (paymentConfigRepository.existsByRestaurantId(
            restaurant.getId())) {

        throw new RuntimeException(
                "Payment config already exists");
    }

    PaymentConfig config = new PaymentConfig();

    config.setRestaurantId(restaurant.getId());
    config.setRazorpayKeyId(request.getRazorpayKeyId());
    config.setRazorpaySecret(request.getRazorpaySecret());
    config.setActive(request.isActive());

    return paymentConfigRepository.save(config);
}
public PaymentConfig getConfig(
        Authentication authentication) {

    String email = authentication.getName();

    User owner = userRepository.findByEmail(email);

    Restaurant restaurant = restaurantRepository
            .findByOwnerId(owner.getId())
            .orElseThrow(() ->
                    new RuntimeException("Restaurant not found"));

    return paymentConfigRepository
            .findByRestaurantId(restaurant.getId())
            .orElseThrow(() ->
                    new RuntimeException("Payment config not found"));
}
public PaymentConfig updateConfig(
        PaymentConfigRequest request,
        Authentication authentication) {

    PaymentConfig config = getConfig(authentication);

    config.setRazorpayKeyId(request.getRazorpayKeyId());
    config.setRazorpaySecret(request.getRazorpaySecret());
    config.setActive(request.isActive());

    return paymentConfigRepository.save(config);
}
    
}
