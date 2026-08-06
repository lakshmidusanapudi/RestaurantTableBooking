package com.example.Backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.Backend.dto.BookingRequest;
import com.example.Backend.enums.BookingStatus;
import com.example.Backend.enums.PaymentStatus;
import com.example.Backend.models.Booking;
import com.example.Backend.models.Restaurant;
import com.example.Backend.models.RestaurantTable;
import com.example.Backend.models.User;
import com.example.Backend.repository.BookingRepository;
import com.example.Backend.repository.RestaurantRepository;
import com.example.Backend.repository.TableRepository;
import com.example.Backend.repository.UserRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RestaurantRepository restaurantRepository;
    private final TableRepository tableRepository;
    private final UserRepository userRepository;

    public BookingService(
            BookingRepository bookingRepository,
            RestaurantRepository restaurantRepository,
            TableRepository tableRepository,
            UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.restaurantRepository = restaurantRepository;
        this.tableRepository = tableRepository;
        this.userRepository = userRepository;
    }

    // ===========================
    // CREATE BOOKING
    // ===========================

    public Booking createBooking(
            BookingRequest request,
            Authentication authentication) {

     

    String email = authentication.getName();

    User customer = userRepository.findByEmail(email);

    RestaurantTable table = tableRepository.findById(request.getTableId())
            .orElseThrow(() ->
                    new RuntimeException("Table not found"));

    Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
            .orElseThrow(() ->
                    new RuntimeException("Restaurant not found"));

    Booking booking = new Booking();

    booking.setCustomerId(customer.getId());
    booking.setRestaurantId(restaurant.getId());
    booking.setTableId(table.getId());

    booking.setCustomerName(customer.getName());
    booking.setCustomerEmail(customer.getEmail());
    booking.setCustomerPhone(customer.getPhone());

    booking.setBookingDate(request.getBookingDate());
    booking.setBookingTime(request.getBookingTime());
    booking.setNumberOfGuests(request.getNumberOfGuests());
    booking.setSpecialRequest(request.getSpecialRequest());

    // 👇 IKKADA CHANGE CHEYYALI
    booking.setAmount(table.getBookingPrice());

    booking.setBookingStatus(BookingStatus.PENDING);
    booking.setPaymentStatus(PaymentStatus.PENDING);
    booking.setCreatedAt(LocalDateTime.now());

    return bookingRepository.save(booking);
}
    // ===========================
    // MY BOOKINGS
    // ===========================

    public List<Booking> getMyBookings(Authentication authentication) {

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email);

        if (customer == null) {
            throw new RuntimeException("Customer not found");
        }

        return bookingRepository.findByCustomerId(customer.getId());
    }

    // ===========================
    // BOOKING BY ID
    // ===========================

    public Booking getBookingById(String id) {

        return bookingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));
    }

    // ===========================
    // CANCEL BOOKING
    // ===========================

    public Booking cancelBooking(
            String bookingId,
            Authentication authentication) {

        String email = authentication.getName();

        User customer = userRepository.findByEmail(email);

        Booking booking = bookingRepository
                .findById(bookingId)
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        if (!booking.getCustomerId().equals(customer.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        booking.setBookingStatus(BookingStatus.CANCELLED);

        return bookingRepository.save(booking);
    }

    public List<Booking> getRestaurantBookings(
        Authentication authentication) {

    String email = authentication.getName();

    User owner = userRepository.findByEmail(email);

    Restaurant restaurant =
            restaurantRepository.findByOwnerId(owner.getId())
                    .orElseThrow(() ->
                            new RuntimeException("Restaurant not found"));

    return bookingRepository.findByRestaurantId(
            restaurant.getId());
}
}