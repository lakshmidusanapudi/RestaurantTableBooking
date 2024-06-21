package com.example.Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.DTO.AdminLogin;
import com.example.Backend.Service.AdminService;

@CrossOrigin(origins="http://localhost:3000/")
@RestController
@RequestMapping("/api/auth")
public class AdminController {
    @Autowired
    AdminService adminService;
    @PostMapping("/admin/login")
    public String AdminLogin(@RequestBody AdminLogin adminLogin)
    {
        return  adminService.Login(adminLogin.getEmail(),adminLogin.getPassword());
       
    }

}
