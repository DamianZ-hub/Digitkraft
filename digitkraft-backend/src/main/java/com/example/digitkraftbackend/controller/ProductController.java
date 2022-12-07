package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.AddProductDTO;
import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.dto.SearchBodyDTO;
import com.example.digitkraftbackend.exceptions.CategoryNotFoundException;
import com.example.digitkraftbackend.service.ProductService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/search")
    public List<ProductDTO> searchAllProducts(@RequestBody SearchBodyDTO searchBodyDTO) {
        return productService.searchAllProducts(searchBodyDTO);
    }

    @PostMapping
    public String addProduct(@RequestBody AddProductDTO product) throws IOException, CategoryNotFoundException {
        productService.saveProduct(product);
        log.info("Product {} saved successfully", product);
        return "Product" + product + " saved successfully";
    }

    @GetMapping(
            value = "/image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public @ResponseBody ResponseEntity<byte[]> getImage(@RequestParam("path") String path) {
        var result = productService.getProductImage(path);

        if (result == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(result);
    }
}
