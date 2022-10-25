package com.example.digitkraftbackend.model.utils.converter;

import com.example.digitkraftbackend.model.utils.PaymentMethod;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class PaymentMethodConverter implements AttributeConverter<PaymentMethod, String> {

    @Override
    public String convertToDatabaseColumn(PaymentMethod paymentMethod) {
        if (paymentMethod == null) {
            return null;
        }
        return paymentMethod.getCode();
    }

    @Override
    public PaymentMethod convertToEntityAttribute(String code) {
        if (code == null) {
            return null;
        }

        return Stream.of(PaymentMethod.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
