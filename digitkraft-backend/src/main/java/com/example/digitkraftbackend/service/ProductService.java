package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.dto.SearchBodyDTO;
import com.example.digitkraftbackend.mapper.ProductMapper;
import com.example.digitkraftbackend.model.Product;
import com.example.digitkraftbackend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDTO> getAllProducts() {
        List<Product> productList = productRepository.findAllByOrderByName();
        log.info("Successfully find all products from database");
        return productList.stream().map(productMapper::productToProductDTO).toList();
    }

    public List<ProductDTO> searchAllProducts(SearchBodyDTO searchBodyDTO) {
        List<Product> productList = productRepository.searchProducts(searchBodyDTO.getName(), searchBodyDTO.getMinPrice(), searchBodyDTO.getMaxPrice(), searchBodyDTO.getCategory());
        log.info("Successfully find all products with search body: {}", searchBodyDTO);
        return productList.stream().map(productMapper::productToProductDTO).toList();
    }
}
