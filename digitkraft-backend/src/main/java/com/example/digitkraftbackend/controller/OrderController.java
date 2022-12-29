package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAllOrders(){
        return orderService.getAllOrders();
    }

    @PostMapping
    public String addOrder(@RequestBody OrderDTO orderDTO) throws IOException, UserNotFoundException, ContactInfoNotFoundException, AddressNotFoundException, ShipmentNotFoundException {
        orderService.saveOrder(orderDTO);
        log.info("Order {} saved successfully", orderDTO);
        return "Order" + orderDTO + " saved successfully";
    }

    @DeleteMapping
    public String deleteOrder(@RequestParam Integer orderId) throws IOException, OrderNotFoundException {
        orderService.deleteOrder(orderId);
        log.info("Order {} deleted successfully", orderId);
        return "Order with id: " + orderId + " deleted successfully";
    }
}
