package com.example.Backend.Service;

import java.util.List;

import com.example.Backend.Entities.BookingDetails;

public interface BookingService {
    public String Booking(BookingDetails bookingDetails);
    public String BookingApproval(Long id);
    public String getBookingStatus(Long id);
    public List<BookingDetails> getAllBookings();
    public String cancelBooking(Long id);
    public List<BookingDetails> getBookingDetails(String email);
    

}
