package com.example.digitkraftbackend.dto;

import lombok.Data;

import java.util.Set;

@Data
public class AddProductDTO {
    private String category;
    private String name;
    private String description;
    private Double price;
    private Set<CopyDTO> copies;
    private Set<ProductImageDTO> productImages;
    private String fileName;
    private String base64Content;
}
