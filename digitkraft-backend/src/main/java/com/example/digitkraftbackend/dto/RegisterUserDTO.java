package com.example.digitkraftbackend.dto;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
@Valid
public class RegisterUserDTO {

    @NotEmpty(message = "Username must be present")
    @Size(min = 8, max = 50, message = "Username must have more than 8 characters and less than 50")
    private String username;

    @NotEmpty(message = "Password must be present")
    @Size(min = 8, max = 50, message = "Password must have more than 8 characters and less than 50")
    private String password;

    @NotEmpty(message = "Repeat password must be present")
    @Size(min = 8, max = 50, message = "Repeat password must have more than 8 characters and less than 50")
    private String repeatPassword;

    @NotEmpty(message = "Repeat password must be present")
    @Size(min = 8, max = 50, message = "Email must have more than 8 characters and less than 50")
    @Email(message = "Email must have valid syntax")
    private String email;
}
