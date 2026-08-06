
package com.example.Backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.models.Restaurant;


public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    Optional<Restaurant> findByOwnerId(String ownerId);

    boolean existsByOwnerId(String ownerId);

}