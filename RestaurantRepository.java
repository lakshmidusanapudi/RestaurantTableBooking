package com.example.Backend.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Entities.Restaurants;

public interface RestaurantRepository extends JpaRepository<Restaurants,String> {

    public void deleteByName(String name);

    public Optional<Restaurants> findByName(String name);

   

    

}
