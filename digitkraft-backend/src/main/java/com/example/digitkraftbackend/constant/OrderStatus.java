package com.example.digitkraftbackend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OrderStatus {
    CREATED("CREATED"), PAID("PAID"), SENT("SENT"), RECEIVED("RECEIVED"), DELETED("DELETED");

    private String code;
}
