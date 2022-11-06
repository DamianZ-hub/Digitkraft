package com.example.digitkraftbackend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderStatus {
    CREATED("C"), PAID("P"), SENT("S"), RECEIVED("R"), DELETED("D");

    private String code;
}
