package com.example.Backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="restaurants")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Restaurants {
    @Id
    private String name;
    private String location;
    private String tollfreenumber;
}
