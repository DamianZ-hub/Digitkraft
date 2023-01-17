package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.AddOrderDTO;
import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.model.User;
import com.example.digitkraftbackend.security.UserDetailsImpl;
import com.example.digitkraftbackend.service.OrderService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @GetMapping("/all")
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping
    public List<OrderDTO> getOrdersByUserId(@RequestParam Integer userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @PostMapping
    public String addOrder(@RequestBody AddOrderDTO orderDTO,
                           @AuthenticationPrincipal UserDetailsImpl userDetails) {
        String uniqueCode = orderService.saveOrder(orderDTO, userDetails);
        log.info("Order {} saved successfully for userId: {} with code: {}", orderDTO, userDetails.getUser().getId(), uniqueCode);
        return uniqueCode;
    }

    @DeleteMapping
    public String deleteOrder(@RequestParam Integer orderId) throws IOException, OrderNotFoundException {
        orderService.deleteOrder(orderId);
        log.info("Order {} deleted successfully", orderId);
        return "Order with id: " + orderId + " deleted successfully";
    }
}
