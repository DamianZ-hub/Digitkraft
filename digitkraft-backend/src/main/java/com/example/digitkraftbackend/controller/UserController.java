package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.dto.UserDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.service.OrderService;
import com.example.digitkraftbackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserDTO getUserInfo(@RequestParam Integer userId) throws UserNotFoundException, IOException {
        return userService.getUserInfo(userId);
    }

}
