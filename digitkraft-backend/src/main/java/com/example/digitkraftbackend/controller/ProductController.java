package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.dto.SearchBodyDTO;
import com.example.digitkraftbackend.exceptions.CategoryNotFoundException;
import com.example.digitkraftbackend.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/search")
    public List<ProductDTO> searchAllProducts(@RequestBody SearchBodyDTO searchBodyDTO) {
        return productService.searchAllProducts(searchBodyDTO);
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public String addProduct(@RequestPart ProductDTO product, @RequestPart MultipartFile image) throws IOException, CategoryNotFoundException {
        productService.saveProduct(product, image);
        log.info("Product {} saved successfully", product);
        return "Product" + product + " saved successfully";
    }
}
