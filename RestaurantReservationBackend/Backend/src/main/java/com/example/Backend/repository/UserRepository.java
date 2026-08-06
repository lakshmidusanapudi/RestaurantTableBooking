package com.example.Backend.repository;

import java.util.List;

import com.example.Backend.enums.Role;
import com.example.Backend.enums.Status;
import com.example.Backend.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    boolean existsByEmail(String email);
     
    List<User> findByRoleAndStatus(Role role, Status status);

}