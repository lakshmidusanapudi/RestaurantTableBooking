package com.example.Backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity

@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class BookingDetails {
    @Id
   @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long Id;
    private String name;
    private String email;
    private String restaurantname;
    private String mobilenumber;
    private String date;
    private String time;
    private String tableno;
    private int seats;
    private String status="waiting";

}
