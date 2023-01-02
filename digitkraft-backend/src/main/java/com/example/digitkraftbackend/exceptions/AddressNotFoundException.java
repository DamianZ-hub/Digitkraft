package com.example.digitkraftbackend.exceptions;

public class AddressNotFoundException extends Exception {
    public AddressNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
