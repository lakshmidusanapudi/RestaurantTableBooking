package com.example.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.models.RestaurantTable;

public interface TableRepository extends MongoRepository<RestaurantTable, String> {

    List<RestaurantTable> findByRestaurantId(String restaurantId);

    Optional<RestaurantTable> findByRestaurantIdAndTableNumber(
            String restaurantId,
            String tableNumber);

    boolean existsByRestaurantIdAndTableNumber(
            String restaurantId,
            String tableNumber);
}