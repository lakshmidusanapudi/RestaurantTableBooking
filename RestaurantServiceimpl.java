package com.example.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Entities.Restaurants;
import com.example.Backend.Repository.RestaurantRepository;

@Service
public class RestaurantServiceimpl implements RestaurantService{

@Autowired
RestaurantRepository restaurantRepository;

    @Override
    public String AddRestaurant(Restaurants restaurants) {
        restaurantRepository.save(restaurants);
        return "added successfully";
    }
    @Override
    public List<Restaurants> ViewAllRestaurants() {
       List<Restaurants> restaurants=restaurantRepository.findAll();
       return restaurants;
        
    }
    
    
    @Override
    public String DeleteRestaurent(String name) {
        Optional<Restaurants> restaurant=restaurantRepository.findByName(name);

        if(restaurant.isPresent())
        {
            restaurantRepository.deleteById(name);
            return "deteled successfully";
        }
        else{
            return "id not found";
        }
    }
    @Override
    public String UpdateRestaurent(String name, Restaurants restaurants) {
      
          restaurantRepository.save(restaurants);
          return  "updated succesfully";
       
    }
    @Override
    public List<Restaurants> ViewRestarants(String name) {
       
        throw new UnsupportedOperationException("Unimplemented method 'ViewRestarants'");
    }
    
    
    
    
   

}
