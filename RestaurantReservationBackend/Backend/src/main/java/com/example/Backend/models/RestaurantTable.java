package com.example.Backend.models;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.Backend.enums.TableLocation;
import com.example.Backend.enums.TableType;

@Document(collection = "tables")
@CompoundIndexes({
    @CompoundIndex(
        name = "restaurant_table_unique",
        def = "{'restaurantId':1,'tableNumber':1}",
        unique = true
    )
})
public class RestaurantTable {

    @Id
    private String id;

    private String restaurantId;

    private String tableNumber;

    private int capacity;

    private TableType tableType;

    private TableLocation tableLocation;

    private boolean available;

    private double bookingPrice;

private boolean advancePaymentRequired;  

    public RestaurantTable() {
    }

    public RestaurantTable(String id, String restaurantId, String tableNumber,
                           int capacity, TableType tableType,
                           TableLocation tableLocation, boolean available,double bookingPrice,boolean advancePaymentRequired) {
        this.id = id;
        this.restaurantId = restaurantId;
        this.tableNumber = tableNumber;
        this.capacity = capacity;
        this.tableType = tableType;
        this.tableLocation = tableLocation;
        this.available = available;
        this.bookingPrice=bookingPrice;
        this.advancePaymentRequired=advancePaymentRequired;
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

    @Override
    public String toString() {
        return "RestaurantTable{" +
                "id='" + id + '\'' +
                ", restaurantId='" + restaurantId + '\'' +
                ", tableNumber='" + tableNumber + '\'' +
                ", capacity=" + capacity +
                ", tableType=" + tableType +
                ", tableLocation=" + tableLocation +
                ", available=" + available +
                '}';
    }
}
