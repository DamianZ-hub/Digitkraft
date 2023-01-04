package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.mapper.OrderMapper;
import com.example.digitkraftbackend.model.*;
import com.example.digitkraftbackend.repository.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ShipmentRepository shipmentRepository;
    private final ContactInfoRepository contactInfoRepository;

    public List<OrderDTO> getAllOrders() {
        List<Order> orderList = orderRepository.findAllByOrderByPlacementDateDesc();
        log.info("Successfully returned all orders from database");
        return orderList.stream().map(orderMapper::orderToOrderDTO).toList();
    }

    public List<OrderDTO> getOrdersByUserId(Integer userId) {
        List<Order> orderList = orderRepository.findAllByUserIdOrderByPlacementDateDesc(userId);
        log.info("Successfully returned orders for userId = " + userId + " from database");
        return orderList.stream().map(orderMapper::orderToOrderDTO).toList();
    }

    public void saveOrder(OrderDTO orderDTO) throws IOException, UserNotFoundException, ShipmentNotFoundException, AddressNotFoundException, ContactInfoNotFoundException {

        Order order = orderMapper.orderDTOtoOrder(orderDTO);
        if (orderDTO.getUser() != null) {
            Integer userId = orderDTO.getUser().getId();
            if (userId == null) throw new IOException("Null user id");
            User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Could not find user with id: " + userId));
            order.setUser(user);
        }

        if (orderDTO.getAddress() != null) {
            Integer addressId = orderDTO.getAddress().getId();
            if (addressId == null) throw new IOException("Null address id");
            Address address = addressRepository.findById(addressId).orElseThrow(() -> new AddressNotFoundException("Could not find address with id: " + addressId));
            order.setAddress(address);
        }

        if (orderDTO.getShipment() != null) {
            Integer shipmentId = orderDTO.getShipment().getId();
            if (shipmentId == null) throw new IOException("Null shipment id");
            Shipment shipment = shipmentRepository.findById(shipmentId).orElseThrow(() -> new ShipmentNotFoundException("Could not find shipment with id: " + shipmentId));
            order.setShipment(shipment);
        }

        if (orderDTO.getContactInfo() != null) {
            Integer contactInfoId = orderDTO.getContactInfo().getId();
            if (contactInfoId == null) throw new IOException("Null contactInfo id");
            ContactInfo contactInfo = contactInfoRepository.findById(contactInfoId).orElseThrow(() -> new ContactInfoNotFoundException("Could not find contactInfo with id: " + contactInfoId));
            order.setContactInfo(contactInfo);
        }

        orderRepository.save(order);
    }

    public void deleteOrder(Integer orderId) throws IOException, OrderNotFoundException {

        if (orderId == null) throw new IOException("Null order id");

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Could not find order with id: " + orderId));
        orderRepository.delete(order);
    }

}
