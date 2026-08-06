package com.example.Backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.dto.TableRequest;
import com.example.Backend.models.RestaurantTable;
import com.example.Backend.service.TableService;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin("*")
public class TableController {

    private final TableService tableService;
 

    public TableController(TableService tableService) {
        this.tableService = tableService;
        
    }

    // OWNER ADD TABLE

    @PostMapping
    public ResponseEntity<RestaurantTable> addTable(
            @RequestBody TableRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                tableService.addTable(request, authentication));
    }

    // OWNER TABLES

    @GetMapping("/my")
    public ResponseEntity<List<RestaurantTable>> getMyTables(
            Authentication authentication) {

        return ResponseEntity.ok(
                tableService.getMyTables(authentication));
    }

    // CUSTOMER TABLES

   @GetMapping("/restaurants/{restaurantId}")
public ResponseEntity<List<RestaurantTable>> getRestaurantTables(
        @PathVariable String restaurantId) {

    return ResponseEntity.ok(
            tableService.getTablesByRestaurant(restaurantId));
}
    // GET SINGLE TABLE

    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTable> getTable(
            @PathVariable String id) {

        return ResponseEntity.ok(
                tableService.getTableById(id));
    }

    // UPDATE

    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTable> updateTable(
            @PathVariable String id,
            @RequestBody TableRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                tableService.updateTable(id, request, authentication));
    }

    // DELETE

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTable(
            @PathVariable String id,
            Authentication authentication) {

        tableService.deleteTable(id, authentication);

        return ResponseEntity.ok("Table Deleted Successfully");
    }
}