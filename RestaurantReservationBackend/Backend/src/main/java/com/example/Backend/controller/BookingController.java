package com.example.Backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.dto.BookingRequest;
import com.example.Backend.models.Booking;

import com.example.Backend.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;
 

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
        
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody BookingRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.createBooking(request, authentication));
    }

    @GetMapping("/my")
    public ResponseEntity<List<Booking>> myBookings(
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.getMyBookings(authentication));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> bookingById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                bookingService.getBookingById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Booking> cancelBooking(
            @PathVariable String id,
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.cancelBooking(id, authentication));
    }

        @GetMapping("/owner")
    public ResponseEntity<List<Booking>> getRestaurantBookings(
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.getRestaurantBookings(authentication));
    }

}