package com.example.Backend.models;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "payment_configs")
public class PaymentConfig {

    @Id
    private String id;

    private String restaurantId;

    private String razorpayKeyId;

    private String razorpaySecret;

    private boolean active;

    public PaymentConfig() {
    }

    public PaymentConfig(String id, String restaurantId,
                         String razorpayKeyId,
                         String razorpaySecret,
                         boolean active) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.razorpayKeyId = razorpayKeyId;
        this.razorpaySecret = razorpaySecret;
        this.active = active;
    }

    public String getId() {
        return id;
    }
public void setId(String id) {
    this.id = id;
}

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getRazorpayKeyId() {
        return razorpayKeyId;
    }

    public void setRazorpayKeyId(String razorpayKeyId) {
        this.razorpayKeyId = razorpayKeyId;
    }

    public String getRazorpaySecret() {
        return razorpaySecret;
    }

    public void setRazorpaySecret(String razorpaySecret) {
        this.razorpaySecret = razorpaySecret;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "PaymentConfig{" +
                "id='" + id + '\'' +
                ", restaurantId='" + restaurantId + '\'' +
                ", razorpayKeyId='" + razorpayKeyId + '\'' +
                ", active=" + active +
                '}';
    }
}
