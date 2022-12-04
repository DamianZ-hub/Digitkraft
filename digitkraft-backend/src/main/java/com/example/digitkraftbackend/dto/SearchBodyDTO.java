package com.example.digitkraftbackend.dto;

import lombok.Data;

@Data
public class SearchBodyDTO {

    private String category;
    private Double minPrice;
    private Double maxPrice;
    private String name;
}
