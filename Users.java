package com.example.Backend.Entities;

import java.sql.Blob;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name="Users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Users {
    @Id
    
    private String email;
    private String name;
    private String password;
    private String mobilenumber;
    private String address;

    @Lob
    private Blob image;
    
    
}
