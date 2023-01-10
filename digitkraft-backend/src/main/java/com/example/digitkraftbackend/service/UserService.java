package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.OrderDTO;
import com.example.digitkraftbackend.dto.UserDTO;
import com.example.digitkraftbackend.exceptions.*;
import com.example.digitkraftbackend.mapper.OrderMapper;
import com.example.digitkraftbackend.mapper.UserMapper;
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
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ShipmentRepository shipmentRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final UserMapper userMapper;

    public UserDTO getUserInfo(Integer userId) throws IOException, UserNotFoundException {

        if (userId == null) throw new IOException("Null user id");

        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("Could not find user with id: " + userId));

        return userMapper.UserToUserDTO(user);
    }



}
