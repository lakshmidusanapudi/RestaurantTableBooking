package com.example.Backend.service;

import java.util.Map;
import java.time.LocalDateTime;
import java.util.HashMap;

import org.json.JSONObject;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.example.Backend.dto.CreateOrderRequest;
import com.example.Backend.dto.VerifyPaymentRequest;
import com.example.Backend.enums.BookingStatus;
import com.example.Backend.enums.PaymentStatus;
import com.example.Backend.models.Booking;
import com.example.Backend.models.PaymentConfig;
import com.example.Backend.models.User;
import com.example.Backend.repository.BookingRepository;
import com.example.Backend.repository.PaymentConfigRepository;
import com.example.Backend.repository.PaymentRepository;
import com.example.Backend.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.example.Backend.service.EmailService;

import com.example.Backend.models.Payment;

import com.razorpay.Utils;




    
    @Service
public class PaymentService {

    private final PaymentConfigRepository paymentConfigRepository;
    private final BookingRepository bookingRepository;
private final UserRepository userRepository;
private final PaymentRepository paymentRepository;
private final EmailService emailService;


public PaymentService(
        PaymentConfigRepository paymentConfigRepository,
        BookingRepository bookingRepository,
        UserRepository userRepository,
        PaymentRepository paymentRepository,
        EmailService emailService) {

    this.paymentConfigRepository = paymentConfigRepository;
    this.bookingRepository = bookingRepository;
    this.userRepository = userRepository;
    this.paymentRepository = paymentRepository;
    this.emailService = emailService;
}
    public RazorpayClient getClient(String restaurantId) throws RazorpayException {

        PaymentConfig config = paymentConfigRepository
                .findByRestaurantIdAndActiveTrue(restaurantId)
                .orElseThrow(() ->
                        new RuntimeException("Payment config not found"));

        return new RazorpayClient(
                config.getRazorpayKeyId(),
                config.getRazorpaySecret()
        );
    }

    
  

public Map<String, Object> createOrder(
        CreateOrderRequest request,
        Authentication authentication) throws Exception {

    String email = authentication.getName();

    User customer = userRepository.findByEmail(email);

    if (customer == null) {
        throw new RuntimeException("Customer not found");
    }

    Booking booking = bookingRepository.findById(request.getBookingId())
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    RazorpayClient razorpay = getClient(booking.getRestaurantId());

    JSONObject options = new JSONObject();
    options.put("amount", (int) (booking.getAmount() * 100));
    options.put("currency", "INR");
    options.put("receipt", booking.getId());

    Order order = razorpay.orders.create(options);

    booking.setRazorpayOrderId(order.get("id"));
    bookingRepository.save(booking);

    Map<String, Object> response = new HashMap<>();
    response.put("orderId", order.get("id"));
    response.put("amount", order.get("amount"));
    response.put("currency", order.get("currency"));
    response.put(
            "key",
            paymentConfigRepository
                    .findByRestaurantIdAndActiveTrue(booking.getRestaurantId())
                    .orElseThrow(() -> new RuntimeException("Payment config not found"))
                    .getRazorpayKeyId()
    );

    return response;
}

public String verifyPayment(
        VerifyPaymentRequest request,
        Authentication authentication) throws Exception {

    Booking booking = bookingRepository.findById(request.getBookingId())
            .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

    PaymentConfig config = paymentConfigRepository
            .findByRestaurantIdAndActiveTrue(booking.getRestaurantId())
            .orElseThrow(() ->
                    new RuntimeException("Payment Config not found"));

    JSONObject options = new JSONObject();

    options.put("razorpay_order_id",
            request.getRazorpayOrderId());

    options.put("razorpay_payment_id",
            request.getRazorpayPaymentId());

    options.put("razorpay_signature",
            request.getRazorpaySignature());

    boolean valid = Utils.verifyPaymentSignature(
            options,
            config.getRazorpaySecret());

    if (!valid) {
        throw new RuntimeException("Invalid Signature");
    }

    booking.setPaymentStatus(PaymentStatus.SUCCESS);
    booking.setBookingStatus(BookingStatus.CONFIRMED);
    booking.setRazorpayPaymentId(request.getRazorpayPaymentId());

    bookingRepository.save(booking);

    Payment payment = new Payment();

    payment.setBookingId(booking.getId());
    payment.setRestaurantId(booking.getRestaurantId());
    payment.setCustomerId(booking.getCustomerId());

    payment.setAmount(booking.getAmount());

    payment.setCurrency("INR");

    payment.setRazorpayOrderId(request.getRazorpayOrderId());

    payment.setRazorpayPaymentId(
            request.getRazorpayPaymentId());

    payment.setRazorpaySignature(
            request.getRazorpaySignature());

    payment.setPaymentStatus(PaymentStatus.SUCCESS);

    payment.setPaymentDate(LocalDateTime.now());

    paymentRepository.save(payment);

    emailService.sendBookingConfirmationMail(booking);

    return "Payment Successful";
}
}

