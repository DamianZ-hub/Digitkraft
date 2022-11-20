package com.example.digitkraftbackend.dto;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;

@Data
@Valid
public class LoginUserDTO {

    @NotEmpty(message = "Username must be present")
    private String username;

    @NotEmpty(message = "Password must be present")
    private String password;
}
