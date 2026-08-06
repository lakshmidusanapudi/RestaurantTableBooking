package com.example.Backend.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Backend.enums.BookingStatus;
import com.example.Backend.models.Booking;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByCustomerId(String customerId);

    List<Booking> findByRestaurantId(String restaurantId);

    List<Booking> findByTableId(String tableId);

    boolean existsByTableIdAndBookingDateAndBookingTimeAndBookingStatus(
            String tableId,
            LocalDate bookingDate,
            LocalTime bookingTime,
            BookingStatus bookingStatus);

}