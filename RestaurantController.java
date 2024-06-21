package com.example.Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Entities.Restaurants;
import com.example.Backend.Service.RestaurantService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class RestaurantController {
@Autowired
RestaurantService restaurantService;
@PostMapping("/admin/addrestaurant")
public String AddRestaurant(@RequestBody Restaurants restaurants)
{
    return  restaurantService.AddRestaurant(restaurants);
}
@GetMapping("/user/viewrestaurants")
public List<Restaurants> ViewAllRestaurants()
{
    return restaurantService.ViewAllRestaurants();
}

@PutMapping("/restaurant/update/{name}")
public String UpdateRestaurent(@PathVariable String name,@RequestBody Restaurants restaurants)
{
    return restaurantService.UpdateRestaurent(name,restaurants);
}
@DeleteMapping("/restaurent/delete/{name}")
public String DeleteRestaurent(@PathVariable String name)
{ 
    return restaurantService.DeleteRestaurent(name);
}

}
