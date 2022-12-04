package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.ContactInfoDTO;
import com.example.digitkraftbackend.model.ContactInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContactInfoMapper {

    ContactInfoDTO contactInfoToContactInfoDTO(ContactInfo contactInfo);
}
