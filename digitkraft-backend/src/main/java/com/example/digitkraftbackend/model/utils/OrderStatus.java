package com.example.digitkraftbackend.model.utils;

public enum OrderStatus {
    CREATED("C"), PAID("P"), SENT("S"), RECEIVED("R"), DELETED("D");

    private String code;

    OrderStatus(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
