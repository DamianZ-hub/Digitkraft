package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.RegisterUserDTO;
import com.example.digitkraftbackend.dto.SessionDTO;
import com.example.digitkraftbackend.dto.LoginUserDTO;
import com.example.digitkraftbackend.security.SessionRegistry;
import com.example.digitkraftbackend.service.UserAuthenticationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/authentication")
@Slf4j
public class AuthenticationController {

    private final UserAuthenticationService userAuthenticationService;
    private final AuthenticationManager authenticationManager;
    private final SessionRegistry sessionRegistry;

    public AuthenticationController(UserAuthenticationService userAuthenticationService, AuthenticationManager authenticationManager, SessionRegistry sessionRegistry) {
        this.userAuthenticationService = userAuthenticationService;
        this.authenticationManager = authenticationManager;
        this.sessionRegistry = sessionRegistry;
    }

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity<SessionDTO> login(@RequestBody @Valid LoginUserDTO user) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );
        log.info("Successfully logged the user with username: {}", user.getPassword());
        return ResponseEntity.ok(new SessionDTO(sessionRegistry.registerSession(user.getUsername())));
    }

    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterUserDTO user) {
        userAuthenticationService.registerUser(user);
        log.info("Successfully registered the user with username: {}", user.getUsername());
        return ResponseEntity.ok("Successfully registered the user with username: " + user.getUsername());
    }
}
