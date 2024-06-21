package com.example.Backend.Service;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.Backend.DTO.UserDTO;
import com.example.Backend.Entities.Users;
import com.example.Backend.Repository.UserRepository;

@Service
public class UserServiceImpl implements  UserService{
    @Autowired
    UserRepository userRepo;

    @Override
    public String Login(String email, String password) {
        Optional<Users> user=userRepo.findByEmail(email);
        if (user.isPresent()) {
            Users users = user.get();
            if (users.getPassword().equals(password)) {
                return "Login Successful";
            } else {
                return "Login Unsuccessful: Incorrect password";
            }
        } else {
            return "Login Unsuccessful: Account not found";
        }
        
    }

    @Override
    public String Register(MultipartFile image,String email,String name,String password,String mobilenumber,String address) throws IOException ,SQLException{
      Users user=new Users();
      user.setEmail(email);
      user.setName(name);
      user.setPassword(password);
      user.setAddress(address);
      user.setMobilenumber(mobilenumber);
      if(!image.isEmpty())
      {
        byte[] photoBytes=image.getBytes();
        Blob photBlob=new SerialBlob(photoBytes);
        user.setImage(photBlob);
      }
      userRepo.save(user);
      return "Successfully Registered";   
    
    }

    @Override
    public List<UserDTO> getAllProfiles() {
        List<Users> usersList = userRepo.findAll();
        return usersList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private UserDTO convertToDTO(Users user) {
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
   




}
