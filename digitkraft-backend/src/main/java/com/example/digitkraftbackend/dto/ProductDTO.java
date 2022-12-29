package com.example.digitkraftbackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class ProductDTO {

    private Integer id;
    private CategoryDTO category;
    private String name;
    private String description;
    private Double price;
    private Set<CopyDTO> copies;
    private Set<ProductImageDTO> productImages;
}
