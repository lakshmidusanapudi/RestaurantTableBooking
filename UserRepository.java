package com.example.Backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Entities.Users;

public interface UserRepository extends JpaRepository<Users, String> {

    Optional<Users> findByEmail(String email);

   

   

}
