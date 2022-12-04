package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.AddressDTO;
import com.example.digitkraftbackend.model.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {

    AddressDTO addressToAddressDTO(Address address);
}
