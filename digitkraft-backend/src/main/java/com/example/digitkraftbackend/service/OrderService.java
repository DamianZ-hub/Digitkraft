package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.constant.OrderStatus;
import com.example.digitkraftbackend.constant.PaymentMethod;
import com.example.digitkraftbackend.dto.AddOrderDTO;
import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.mapper.AddressMapper;
import com.example.digitkraftbackend.mapper.OrderMapper;
import com.example.digitkraftbackend.mapper.ShipmentMapper;
import com.example.digitkraftbackend.model.*;
import com.example.digitkraftbackend.repository.*;
import com.example.digitkraftbackend.security.UserDetailsImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final ShipmentRepository shipmentRepository;

    private final AddressRepository addressRepository;

    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final ShipmentMapper shipmentMapper;
    private final AddressMapper addressMapper;

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

    public String saveOrder(AddOrderDTO orderDTO, UserDetailsImpl userDetails) {

        Shipment shipment = shipmentMapper.shipmentDTOToShipment(orderDTO.getShipment());
        Address address = addressMapper.addressDTOToAddress(orderDTO.getAddress());
        User user = userDetails.getUser();
        user.setAddress(address);

        Order order = Order.builder()
                .orderStatus(OrderStatus.CREATED)
                .paymentMethod(PaymentMethod.CARD)
                .user(userDetails.getUser())
                .address(address)
                .shipment(shipment)
                .code(UUID.randomUUID().toString()).build();

        userRepository.save(user);
        shipmentRepository.save(shipment);
        orderRepository.save(order);
        return order.getCode();
    }

    public void deleteOrder(Integer orderId) throws IOException, OrderNotFoundException {

        if (orderId == null) throw new IOException("Null order id");

        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Could not find order with id: " + orderId));
        orderRepository.delete(order);
    }

}
