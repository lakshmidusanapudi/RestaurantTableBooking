package com.example.Backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Backend.enums.Role;
import com.example.Backend.enums.Status;
import com.example.Backend.models.User;
import com.example.Backend.repository.UserRepository;

@Service
public class SuperAdminService {

    private final UserRepository userRepository;

    public SuperAdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getPendingOwners() {

        return userRepository.findByRoleAndStatus(
                Role.RESTAURANT_OWNER,
                Status.PENDING
        );
    }

    public User approveOwner(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        user.setStatus(Status.APPROVED);

        return userRepository.save(user);
    }

    public User rejectOwner(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        user.setStatus(Status.REJECTED);

        return userRepository.save(user);
    }

    public List<User> getAllOwners() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.RESTAURANT_OWNER)
                .toList();
    }

    public List<User> getAllCustomers() {

        return userRepository.findAll()
                .stream()
                .filter(user -> user.getRole() == Role.CUSTOMER)
                .toList();
    }
}