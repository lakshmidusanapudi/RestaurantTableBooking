package com.example.Backend.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.DTO.UserDTO;



public interface UserService {
   
public String Login(String email,String password);
public String Register(MultipartFile image,String email,String name,String password,String mobilenumber,String address) throws IOException, SQLException;
public List<UserDTO> getAllProfiles();

}
