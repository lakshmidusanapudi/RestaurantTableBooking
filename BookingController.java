package com.example.Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Entities.BookingDetails;
import com.example.Backend.Service.BookingService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class BookingController {
    @Autowired
    BookingService bookingService;
    @PostMapping("/user/booking")
    public String Booking(@RequestBody BookingDetails bookingDetails)
    {
        return bookingService.Booking(bookingDetails);
    }
    @GetMapping("/admin/allbookings")
    public List<BookingDetails> getAllBookings()
    {
        return bookingService.getAllBookings();
    }

    @PutMapping("/admin/statusupdate/{id}")
    public String BookingApproval(@PathVariable Long id)
    {
        return bookingService.BookingApproval(id);
    }
    
    @GetMapping("/user/bookingstatus/{id}")
    public String getBookingStatus(@PathVariable Long id) {
        return bookingService.getBookingStatus(id);
    }

    @PutMapping("/admin/statusupdate/cancel/{id}")
    public String cancelBooking(@PathVariable Long id)
    {
        return  bookingService.cancelBooking(id);
    }
    
    @GetMapping("user/allbookingsby/{email}")
    public List<BookingDetails> Bookings(@PathVariable String email)
    {
        return  bookingService.getBookingDetails(email);
    }
        
}
