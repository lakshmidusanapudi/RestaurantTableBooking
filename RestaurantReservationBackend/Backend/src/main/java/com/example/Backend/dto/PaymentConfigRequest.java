package com.example.Backend.dto;

public class PaymentConfigRequest {

    private String razorpayKeyId;

    private String razorpaySecret;

    private boolean active;

    public PaymentConfigRequest() {
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

}