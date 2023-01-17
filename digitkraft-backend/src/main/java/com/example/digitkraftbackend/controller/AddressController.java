package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.AddressDTO;
import com.example.digitkraftbackend.security.UserDetailsImpl;
import com.example.digitkraftbackend.service.AddressService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public AddressDTO getAddressForUser(@AuthenticationPrincipal UserDetailsImpl userDetails){
        AddressDTO addressDTO = addressService.getAddress(userDetails);
        log.info("Address {} taken successfully for userId: {}", addressDTO, userDetails.getUser().getId());
        return addressDTO;
    }

}
