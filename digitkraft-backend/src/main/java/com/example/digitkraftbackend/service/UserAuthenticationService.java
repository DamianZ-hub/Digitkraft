package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.constant.RoleType;
import com.example.digitkraftbackend.dto.RegisterUserDTO;
import com.example.digitkraftbackend.mapper.UserMapper;
import com.example.digitkraftbackend.model.Role;
import com.example.digitkraftbackend.model.User;
import com.example.digitkraftbackend.repository.ContactInfoRepository;
import com.example.digitkraftbackend.repository.RoleRepository;
import com.example.digitkraftbackend.security.UserDetailsImpl;
import com.example.digitkraftbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class UserAuthenticationService implements UserDetailsService {


    private final UserRepository userRepository;
    private final ContactInfoRepository contactInfoRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDetailsImpl(Optional.ofNullable(userRepository.findByUsername(username)).orElseThrow());
    }

    public void registerUser(RegisterUserDTO registerUser) {
        if (userRepository.existsByUsername(registerUser.getUsername())) {
            throw new RuntimeException("User with that username already exists!");
        }
        if (contactInfoRepository.existsByEmail(registerUser.getEmail())) {
            throw new RuntimeException("User with that email already exists!");
        }
        registerUser.setPassword(passwordEncoder.encode(registerUser.getPassword()));
        User user = userMapper.registerUserDTOToUser(registerUser);
        Set<Role> roles = new HashSet<>();
        roles.add(roleRepository.findByName(RoleType.ROLE_USER).orElseThrow(() -> new RuntimeException("User role not found")));
        user.setRoles(roles);
        userRepository.save(user);
    }
}