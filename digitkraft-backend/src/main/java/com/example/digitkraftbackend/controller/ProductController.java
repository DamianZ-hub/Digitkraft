package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.dto.SearchBodyDTO;
import com.example.digitkraftbackend.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<ProductDTO> searchAllProducts(@RequestBody SearchBodyDTO searchBodyDTO){
        return productService.searchAllProducts(searchBodyDTO);
    }
}
