package com.example.digitkraftbackend.dto;

import lombok.Data;

@Data
public class AddOrderDTO {
    private AddressDTO address;
    private ShipmentDTO shipment;
}
