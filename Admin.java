package com.example.Backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Admin")
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Admin {
  @Id
    private String email;
    private String password;

}
