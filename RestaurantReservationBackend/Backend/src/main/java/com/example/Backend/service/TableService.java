package com.example.Backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.Backend.dto.TableRequest;
import com.example.Backend.models.Restaurant;
import com.example.Backend.models.RestaurantTable;
import com.example.Backend.models.User;
import com.example.Backend.repository.RestaurantRepository;
import com.example.Backend.repository.TableRepository;
import com.example.Backend.repository.UserRepository;

@Service
public class TableService {

    private final TableRepository tableRepository;
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    public TableService(
            TableRepository tableRepository,
            RestaurantRepository restaurantRepository,
            UserRepository userRepository) {

        this.tableRepository = tableRepository;
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
    }

    // ===========================
    // OWNER ADD TABLE
    // ===========================

    public RestaurantTable addTable(
            TableRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        Restaurant restaurant = restaurantRepository
                .findByOwnerId(owner.getId())
                .orElseThrow(() ->
                        new RuntimeException("Restaurant not found"));

        RestaurantTable table = new RestaurantTable();

        table.setRestaurantId(restaurant.getId());
        if (tableRepository.existsByRestaurantIdAndTableNumber(
        restaurant.getId(),
        request.getTableNumber())) {

    throw new RuntimeException(
            "Table number " + request.getTableNumber() + " already exists");
}
        table.setTableNumber(request.getTableNumber());
        table.setCapacity(request.getCapacity());
        table.setTableType(request.getTableType());
        table.setTableLocation(request.getTableLocation());

        table.setAvailable(request.isAvailable());

        // NEW FIELDS
        table.setBookingPrice(request.getBookingPrice());
        table.setAdvancePaymentRequired(
                request.isAdvancePaymentRequired());

        return tableRepository.save(table);
    }

    // ===========================
    // UPDATE TABLE
    // ===========================

    public RestaurantTable updateTable(
            String id,
            TableRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        Restaurant restaurant = restaurantRepository
                .findByOwnerId(owner.getId())
                .orElseThrow(() ->
                        new RuntimeException("Restaurant not found"));

        RestaurantTable table = tableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Table not found"));

        if (!table.getRestaurantId().equals(restaurant.getId())) {
            throw new RuntimeException("Unauthorized");
        }

          RestaurantTable existingTable =
        tableRepository.findByRestaurantIdAndTableNumber(
                restaurant.getId(),
                request.getTableNumber())
        .orElse(null);

if (existingTable != null &&
    !existingTable.getId().equals(id)) {

    throw new RuntimeException(
            "Table number already exists");
}
        table.setTableNumber(request.getTableNumber());
        table.setCapacity(request.getCapacity());
        table.setTableType(request.getTableType());
        table.setTableLocation(request.getTableLocation());
        table.setAvailable(request.isAvailable());

        table.setBookingPrice(request.getBookingPrice());
        table.setAdvancePaymentRequired(
                request.isAdvancePaymentRequired());

        return tableRepository.save(table);
    }

    // ===========================
    // OWNER TABLES
    // ===========================

    public List<RestaurantTable> getMyTables(
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        Restaurant restaurant = restaurantRepository
                .findByOwnerId(owner.getId())
                .orElseThrow(() ->
                        new RuntimeException("Restaurant not found"));

        return tableRepository.findByRestaurantId(
                restaurant.getId());
    }

    // ===========================
    // CUSTOMER TABLES
    // ===========================

    public List<RestaurantTable> getTablesByRestaurant(
            String restaurantId) {

        return tableRepository.findByRestaurantId(restaurantId);
    }

    // ===========================
    // TABLE BY ID
    // ===========================

    public RestaurantTable getTableById(String id) {

        return tableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Table not found"));
    }

    // ===========================
    // DELETE
    // ===========================

    public void deleteTable(
            String id,
            Authentication authentication) {

        String email = authentication.getName();

        User owner = userRepository.findByEmail(email);

        if (owner == null) {
            throw new RuntimeException("Owner not found");
        }

        Restaurant restaurant = restaurantRepository
                .findByOwnerId(owner.getId())
                .orElseThrow(() ->
                        new RuntimeException("Restaurant not found"));

        RestaurantTable table = tableRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Table not found"));

        if (!table.getRestaurantId().equals(restaurant.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        tableRepository.delete(table);
    }

}