package com.example.digitkraftbackend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PaymentMethod {

    PAYU("PAYU"), CARD("CARD"), BLIK("BLIK"), PRZELEWY24("PRZELEWY24");

    private String code;
}
