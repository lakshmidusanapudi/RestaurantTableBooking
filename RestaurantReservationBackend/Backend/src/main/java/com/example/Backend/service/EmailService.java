package com.example.Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.Backend.models.Booking;



    @Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingConfirmationMail(Booking booking) {

        SimpleMailMessage mail = new SimpleMailMessage();

        mail.setTo(booking.getCustomerEmail());

        mail.setSubject("Booking Confirmed");

        mail.setText(
                "Hi " + booking.getCustomerName() + ",\n\n" +

                "Thank you for choosing us.\n\n" +

                "Your restaurant booking has been confirmed.\n\n" +

                "Booking Details\n\n" +

                "Booking Id : " + booking.getId() + "\n" +
                "Date : " + booking.getBookingDate() + "\n" +
                "Time : " + booking.getBookingTime() + "\n" +
                "Guests : " + booking.getNumberOfGuests() + "\n\n" +

                "We look forward to serving you.\n\n" +

                "Thank You,\nRestaurant Team"
        );

        mailSender.send(mail);
    }
}
    
