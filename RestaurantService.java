package com.example.Backend.Service;

import java.util.List;

import com.example.Backend.Entities.Restaurants;

public interface  RestaurantService {
    public String AddRestaurant(Restaurants restaurants);
    public List<Restaurants> ViewAllRestaurants();
    public String UpdateRestaurent(String name,Restaurants restaurants);
    public String DeleteRestaurent(String name);  public List<Restaurants> ViewRestarants(String name);
    
}
