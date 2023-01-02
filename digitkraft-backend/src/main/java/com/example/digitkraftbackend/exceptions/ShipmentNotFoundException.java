package com.example.digitkraftbackend.exceptions;

public class ShipmentNotFoundException extends Exception {
    public ShipmentNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
