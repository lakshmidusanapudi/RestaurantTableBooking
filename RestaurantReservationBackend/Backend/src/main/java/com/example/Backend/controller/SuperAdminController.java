package com.example.Backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.models.User;
import com.example.Backend.service.SuperAdminService;

@RestController
@RequestMapping("/api/superadmin")
public class SuperAdminController {

    private final SuperAdminService superAdminService;

    public SuperAdminController(SuperAdminService superAdminService) {
        this.superAdminService = superAdminService;
    }

    @GetMapping("/owners")
    public ResponseEntity<List<User>> getAllOwners() {

        return ResponseEntity.ok(superAdminService.getAllOwners());
    }
    
    @GetMapping("/customers")
    public ResponseEntity<List<User>> getAllCustomers() {

        return ResponseEntity.ok(superAdminService.getAllCustomers());
    }

    @GetMapping("/owners/pending")
    public ResponseEntity<List<User>> getPendingOwners() {

        return ResponseEntity.ok(superAdminService.getPendingOwners());
    }

    @PatchMapping("/owners/{id}/approve")
    public ResponseEntity<User> approveOwner(@PathVariable String id) {

        return ResponseEntity.ok(superAdminService.approveOwner(id));
    }

    @PatchMapping("/owners/{id}/reject")
    public ResponseEntity<User> rejectOwner(@PathVariable String id) {

        return ResponseEntity.ok(superAdminService.rejectOwner(id));
    }
}