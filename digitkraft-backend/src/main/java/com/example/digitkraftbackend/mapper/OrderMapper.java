package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, ContactInfoMapper.class, AddressMapper.class})
public interface OrderMapper {

    OrderDTO orderToOrderDTO(Order order);

    @Mapping(target = "shipment", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "contactInfo", ignore = true)
    @Mapping(target = "address", ignore = true)
    OrderDTO orderToSimpleOrderDTO(Order order);
}
