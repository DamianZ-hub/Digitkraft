package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.ShipmentDTO;
import com.example.digitkraftbackend.model.Shipment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ShipmentMapper {

    Shipment shipmentDTOToShipment(ShipmentDTO shipmentDTO);

    ShipmentDTO shipmentToShipmentDTO(Shipment shipment);

}
