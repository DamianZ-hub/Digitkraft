package com.example.digitkraftbackend.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum PaymentMethod {

    PAYU("PayU"), CARD("Card"), BLIK("Blik"), PRZELEWY24("P24");

    private String code;
}
