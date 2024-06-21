package com.example.Backend.Service;

import java.sql.Blob;
import java.sql.SQLException;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Entities.Users;
import com.example.Backend.Repository.ProfileRepository;


@Service
public class ProfileServiceImpl {
    @Autowired
    ProfileRepository profileRepository;

    
    public Users profile(String email)
    {
        Optional<Users> user=profileRepository.findByEmail(email);
       if(user.isPresent())
       {
        Users users=user.get();
        return  users;
       }
       else{
        return null;
       }
    }
    
    public byte[] getPhotoBytes(String email) throws SQLException {
        Optional<Users> optionalProfile = profileRepository.findByEmail(email);
        if (optionalProfile.isPresent()) {
            Users profile = optionalProfile.get();
            Blob photoBlob = profile.getImage();
            if (photoBlob != null) {
                return photoBlob.getBytes(1, (int) photoBlob.length());
            }
        }
        return null;
    }
    

}
