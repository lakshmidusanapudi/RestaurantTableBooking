package com.example.Backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Entities.Admin;


public interface AdminRepository extends  JpaRepository<Admin, String>{

    public Optional<Admin> findByEmail(String email);

}
