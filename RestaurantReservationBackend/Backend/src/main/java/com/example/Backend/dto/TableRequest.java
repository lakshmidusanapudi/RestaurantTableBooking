package com.example.Backend.dto;

import com.example.Backend.enums.TableLocation;
import com.example.Backend.enums.TableType;

public class TableRequest {

    private String tableNumber;

    private int capacity;

    private TableType tableType;

    private TableLocation tableLocation;

    private boolean available;

    private double bookingPrice;

    private boolean advancePaymentRequired;

    public TableRequest() {
    }

    public String getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(String tableNumber) {
        this.tableNumber = tableNumber;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public TableType getTableType() {
        return tableType;
    }

    public void setTableType(TableType tableType) {
        this.tableType = tableType;
    }

    public TableLocation getTableLocation() {
        return tableLocation;
    }

    public void setTableLocation(TableLocation tableLocation) {
        this.tableLocation = tableLocation;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public double getBookingPrice() {
        return bookingPrice;
    }

    public void setBookingPrice(double bookingPrice) {
        this.bookingPrice = bookingPrice;
    }

    public boolean isAdvancePaymentRequired() {
        return advancePaymentRequired;
    }

    public void setAdvancePaymentRequired(boolean advancePaymentRequired) {
        this.advancePaymentRequired = advancePaymentRequired;
    }
}