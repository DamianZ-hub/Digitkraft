package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.ContactInfoDTO;
import com.example.digitkraftbackend.dto.RegisterUserDTO;
import com.example.digitkraftbackend.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",uses = {AddressMapper.class, ContactInfoDTO.class})
public interface UserMapper {

    @Mapping(source = "email", target = "contactInfo.email")
    @Mapping(constant = "true", target = "enabled")
    User registerUserDTOToUser(RegisterUserDTO registerUserDTO);
}
