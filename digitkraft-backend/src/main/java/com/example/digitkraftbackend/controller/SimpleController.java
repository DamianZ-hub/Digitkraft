package com.example.digitkraftbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/check")
public class SimpleController {

    @GetMapping
    public String checkConnection() {
        return "Hurray!!! Connected";
    }
}
