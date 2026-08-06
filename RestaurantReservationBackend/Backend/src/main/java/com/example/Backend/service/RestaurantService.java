package com.example.Backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.dto.RestaurantRequest;
import com.example.Backend.models.Address;
import com.example.Backend.models.Restaurant;
import com.example.Backend.models.User;
import com.example.Backend.repository.RestaurantRepository;
import com.example.Backend.repository.UserRepository;


@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;
    private final CloudinaryService cloudinaryService;


    public RestaurantService(RestaurantRepository restaurantRepository,
                             UserRepository userRepository,CloudinaryService cloudinaryService) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
        this.cloudinaryService=cloudinaryService;
    }

    public Restaurant addRestaurant(
        RestaurantRequest request,
        MultipartFile[] images,Authentication authentication) {

        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        if (restaurantRepository.existsByOwnerId(owner.getId())) {
            throw new RuntimeException("Restaurant already exists for this owner");
        }

        Address address = new Address();
        address.setAddressLine1(request.getAddressLine1());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());

        Restaurant restaurant = new Restaurant();

        restaurant.setOwnerId(owner.getId());
        restaurant.setRestaurantName(request.getRestaurantName());
        restaurant.setDescription(request.getDescription());
        restaurant.setPhone(request.getPhone());
        restaurant.setEmail(request.getEmail());
        restaurant.setCuisineType(request.getCuisine());
        restaurant.setOpeningTime(request.getOpeningTime());
        restaurant.setClosingTime(request.getClosingTime());
        restaurant.setAddress(address);
        restaurant.setActive(true);
List<String> imageUrls = new ArrayList<>();

if(images != null){

    for(MultipartFile file : images){

      String imageUrl = cloudinaryService.uploadFile(file, "restaurants");

        imageUrls.add(imageUrl);

    }

}

restaurant.setImages(imageUrls);
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getMyRestaurant() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        return restaurantRepository.findByOwnerId(owner.getId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public Restaurant updateRestaurant(
        String id,
        RestaurantRequest request,
        MultipartFile[] images) {

    Restaurant restaurant = restaurantRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

    // Restaurant Details (Partial Update)

    if (request.getRestaurantName() != null)
        restaurant.setRestaurantName(request.getRestaurantName());

    if (request.getDescription() != null)
        restaurant.setDescription(request.getDescription());

    if (request.getPhone() != null)
        restaurant.setPhone(request.getPhone());

    if (request.getEmail() != null)
        restaurant.setEmail(request.getEmail());

    if (request.getCuisine() != null)
        restaurant.setCuisineType(request.getCuisine());

    if (request.getOpeningTime() != null)
        restaurant.setOpeningTime(request.getOpeningTime());

    if (request.getClosingTime() != null)
        restaurant.setClosingTime(request.getClosingTime());

    // Address Partial Update

    Address address = restaurant.getAddress();

    if (address == null) {
        address = new Address();
    }

    if (request.getAddressLine1() != null)
        address.setAddressLine1(request.getAddressLine1());

    if (request.getCity() != null)
        address.setCity(request.getCity());

    if (request.getState() != null)
        address.setState(request.getState());

    if (request.getPincode() != null)
        address.setPincode(request.getPincode());

    restaurant.setAddress(address);

    // Images

    if (images != null && images.length > 0) {

        List<String> imageUrls = restaurant.getImages();

        if (imageUrls == null) {
            imageUrls = new ArrayList<>();
        }

        for (MultipartFile file : images) {

            String url = cloudinaryService.uploadFile(file, "restaurants");
            imageUrls.add(url);      // append new images
        }

        restaurant.setImages(imageUrls);
    }

    return restaurantRepository.save(restaurant);
}
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(String id) {

        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public void deleteRestaurant(String id) {

        restaurantRepository.deleteById(id);
    }

}