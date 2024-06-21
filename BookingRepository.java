package com.example.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Entities.BookingDetails;

public interface BookingRepository extends JpaRepository<BookingDetails, Long> {

    public List<BookingDetails> findAllByName(String name);

    public List<BookingDetails> findAllByEmail(String email);

    
}
