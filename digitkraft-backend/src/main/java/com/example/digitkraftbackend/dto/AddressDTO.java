package com.example.digitkraftbackend.dto;

import lombok.Data;

@Data
public class AddressDTO {

    private String country;
    private String region;
    private String city;
    private String postCode;
    private String street;
    private String house;
    private String apartment;
}
