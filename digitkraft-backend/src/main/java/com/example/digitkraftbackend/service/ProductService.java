package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.dto.SearchBodyDTO;
import com.example.digitkraftbackend.exceptions.CategoryNotFoundException;
import com.example.digitkraftbackend.mapper.ProductMapper;
import com.example.digitkraftbackend.model.Category;
import com.example.digitkraftbackend.model.Product;
import com.example.digitkraftbackend.model.ProductImage;
import com.example.digitkraftbackend.repository.CategoryRepository;
import com.example.digitkraftbackend.repository.ProductImageRepository;
import com.example.digitkraftbackend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final String root = "uploads/products/";
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductMapper productMapper;

    public void saveProduct(ProductDTO productDTO, MultipartFile file) throws CategoryNotFoundException, IOException {

        Product product = productMapper.productDTOToProduct(productDTO);
        Path path = Paths.get(root + productDTO.getName() + "/");
        Category category = categoryRepository.findByNameIgnoreCase(productDTO.getCategory().getName())
                .orElseThrow(() -> new CategoryNotFoundException("Could not find category with name: " + productDTO.getCategory().getName()));
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
        Files.copy(file.getInputStream(), path.resolve(file.getOriginalFilename()));
        ProductImage productImage = new ProductImage();
        productImage.setProduct(product);
        productImage.setName(file.getOriginalFilename());
        productImage.setPath(root + productDTO.getName() + "/" + file.getOriginalFilename());
        Set<ProductImage> productImageSet = new HashSet<>();
        productImageSet.add(productImage);
        product.setProductImages(productImageSet);
        product.setCategory(category);
        productRepository.save(product);
        productImageRepository.save(productImage);
    }

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
