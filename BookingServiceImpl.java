package com.example.Backend.Service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSendException;
import org.springframework.stereotype.Service;

import com.example.Backend.Entities.BookingDetails;
import com.example.Backend.Repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService {
    private static final Logger logger = LoggerFactory.getLogger(BookingServiceImpl.class);

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    EmailService emailService;

    @Override
    public String Booking(BookingDetails bookingDetails) {
        bookingRepository.save(bookingDetails);
        String result = "Booking Successful. Your booking id: " + bookingDetails.getId()
                + ". Note the id for checking status" + "your Booking Details:" + "\nName:" + bookingDetails.getName()+"\nRestaurant Name:"+bookingDetails.getRestaurantname()+"\nDate:"+bookingDetails.getDate()+"\nTable no:"+bookingDetails.getTableno()+"\nStatus:"+bookingDetails.getStatus();

        // Send confirmation email
        String subject = "Booking Confirmation";
        String text = result;
        try {
            emailService.sendEmail(bookingDetails.getEmail(), subject, text);
        } catch (Exception e) {
            logger.error("Failed to send booking confirmation email", e);
        }

        return result;
    }

    @Override
    public String BookingApproval(Long id) {
        Optional<BookingDetails> bookings = bookingRepository.findById(id);
        if (bookings.isPresent()) {
            BookingDetails bookingDetails = bookings.get();
            bookingDetails.setStatus("Approved");
            bookingRepository.save(bookingDetails);

            // Send approval email
            String subject = "Booking Approved";
            String text = "Your booking with ID " + id + " has been approved.";
            try {
                emailService.sendEmail(bookingDetails.getEmail(), subject, text);
            } catch (MailSendException e) {
                logger.error("Failed to send booking confirmation email due to mail server connection issue", e);
            } catch (Exception e) {
                logger.error("Failed to send booking confirmation email", e);
            }
            return "Status Updated";
        } else {
            return "Booking not found";
        }
    }

    @Override
    public String getBookingStatus(Long id) {
        Optional<BookingDetails> bookingDetails = bookingRepository.findById(id);
        if (bookingDetails.isPresent()) {
            BookingDetails bookings = bookingDetails.get();
            return bookings.getStatus();
        } else {
            return "Booking not found";
        }
    }

    @Override
    public List<BookingDetails> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public String cancelBooking(Long id) {
        Optional<BookingDetails> bookings = bookingRepository.findById(id);
        if (bookings.isPresent()) {
            BookingDetails bookingDetails = bookings.get();
            bookingDetails.setStatus("Cancelled");
            bookingRepository.save(bookingDetails);

            // Send cancellation email
            String subject = "Booking Cancelled";
            String text = "Your booking with ID " + id + " has been cancelled.";
            try {
                emailService.sendEmail(bookingDetails.getEmail(), subject, text);
            } catch (Exception e) {
                logger.error("Failed to send booking cancellation email", e);
            }

            return "Status Updated";
        } else {
            return "Booking not found";
        }
    }

    @Override
    public List<BookingDetails> getBookingDetails(String email) {
        List<BookingDetails> bookings = bookingRepository.findAllByEmail(email);
        return bookings;
    }
}
