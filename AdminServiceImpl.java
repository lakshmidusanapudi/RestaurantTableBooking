package com.example.Backend.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Entities.Admin;
import com.example.Backend.Repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    AdminRepository adminRepository;
    @Override
    public String Login(String email, String password) {
        Optional<Admin> admins=adminRepository.findByEmail(email);
        if (admins.isPresent()) {
            Admin admin = admins.get();
            if (admin.getPassword().equals(password)) {
                return "Login Successful";
            } else {
                return "Login Unsuccessful: Incorrect password";
            }
        } else {
            return "Login Unsuccessful: Account not found";
        }
    }

}
