package com.example.digitkraftbackend.dto;

import com.example.digitkraftbackend.constant.OrderStatus;
import com.example.digitkraftbackend.constant.PaymentMethod;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class OrderDTO {

    private Integer id;
    private OrderStatus orderStatus;
    private PaymentMethod paymentMethod;
    private ShipmentDTO shipment;
    private UserDTO user;
    private ContactInfoDTO contactInfo;
    private AddressDTO address;
    private String code;
    private LocalDate sendDate;
    private LocalDateTime placementDate;
    private String additionalNotes;
}
