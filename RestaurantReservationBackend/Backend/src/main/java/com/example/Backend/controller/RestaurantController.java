package com.example.Backend.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.dto.RestaurantRequest;
import com.example.Backend.models.Restaurant;
import com.example.Backend.service.RestaurantService;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin("*")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

 @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> addRestaurant(

        @RequestPart("restaurant") String restaurantJson,

        @RequestPart(value = "images", required = false)
        MultipartFile[] images,

        Authentication authentication) throws Exception {

    ObjectMapper mapper = new ObjectMapper();

    RestaurantRequest request =
            mapper.readValue(restaurantJson, RestaurantRequest.class);

    return ResponseEntity.ok(
            restaurantService.addRestaurant(request, images, authentication)
    );
}
    @GetMapping("/my")
    public ResponseEntity<Restaurant> getMyRestaurant() {

        return ResponseEntity.ok(restaurantService.getMyRestaurant());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public ResponseEntity<?> updateRestaurant(

        @PathVariable String id,

        @RequestPart("restaurant") String restaurantJson,

        @RequestPart(value = "images", required = false)
        MultipartFile[] images

) throws Exception {

    ObjectMapper mapper = new ObjectMapper();

    RestaurantRequest request =
            mapper.readValue(restaurantJson, RestaurantRequest.class);

    return ResponseEntity.ok(
            restaurantService.updateRestaurant(id, request, images)
    );
}

    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {

        return ResponseEntity.ok(
                restaurantService.getAllRestaurants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                restaurantService.getRestaurantById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRestaurant(
            @PathVariable String id) {

        restaurantService.deleteRestaurant(id);

        return ResponseEntity.ok("Restaurant deleted successfully");
    }

}