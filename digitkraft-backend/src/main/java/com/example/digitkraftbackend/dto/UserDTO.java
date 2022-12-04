package com.example.digitkraftbackend.dto;

import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private boolean enabled;
    private ContactInfoDTO contactInfo;
    private AddressDTO address;
}
