package com.example.digitkraftbackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserDTO {

    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    private String password;
    private boolean enabled;
    private ContactInfoDTO contactInfo;
    private AddressDTO address;
    private Set<UserImageDTO> productImages;
}
