package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.AddressDTO;
import com.example.digitkraftbackend.mapper.AddressMapper;
import com.example.digitkraftbackend.repository.AddressRepository;
import com.example.digitkraftbackend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class AddressService {

    private final AddressRepository addressRepository;

    private final AddressMapper addressMapper;

    public AddressDTO getAddress(UserDetailsImpl userDetails) {
        return Optional.ofNullable(userDetails.getUser().getAddress())
                .map(addressMapper::addressToAddressDTO)
                .orElse(null);
    }
}
