 package com.example.Backend.Controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
 import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.DTO.UserDTO;
import com.example.Backend.DTO.UserLogin;
import com.example.Backend.Entities.Users;
import com.example.Backend.Service.ProfileServiceImpl;
import com.example.Backend.Service.UserService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController

@RequestMapping("/api/auth")

 public class UserController {
  @Autowired
 UserService userService;

 @Autowired
 ProfileServiceImpl profileServiceImpl;

 @PostMapping("/userregister")
 public String Register(@RequestParam("image") MultipartFile image,@RequestParam("email") String email,@RequestParam("name") String name,@RequestParam("password") String password,@RequestParam("mobilenumber") String mobilenumber,@RequestParam("address") String address) throws IOException, SQLException{
   return userService.Register(image,email,name,password,mobilenumber,address) ;
   
}

@PostMapping("/userlogin")
public String Login(@RequestBody UserLogin userLogin)
 {
   return userService.Login(userLogin.getEmail(),userLogin.getPassword());
   
 }
 @GetMapping("/profile/{email}")
    public UserDTO profile(@PathVariable String email) {
        Users user = profileServiceImpl.profile(email);
        if (user != null) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setMobilenumber(user.getMobilenumber());
            userDTO.setAddress(user.getAddress());

          
            if (user.getImage() != null) {
                try {
                    byte[] photoBytes = user.getImage().getBytes(1, (int) user.getImage().length());
                    String base64photo = Base64.getEncoder().encodeToString(photoBytes);
                    userDTO.setImage(base64photo);
                } catch (SQLException e) {
                   
                }
            }
            return userDTO;
        }
        return null;
    }

    @GetMapping("/allusers")
    public List<UserDTO> allUsers() {
        return userService.getAllProfiles();
    }
 
 }


