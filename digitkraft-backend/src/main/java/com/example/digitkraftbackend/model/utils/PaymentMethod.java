package com.example.digitkraftbackend.model.utils;

public enum PaymentMethod {

    PAYU("PayU"), CARD("Card"), BLIK("Blik"), PRZELEWY24("P24");

    private String code;

    PaymentMethod(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
