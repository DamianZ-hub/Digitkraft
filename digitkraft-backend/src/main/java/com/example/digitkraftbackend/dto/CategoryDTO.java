package com.example.digitkraftbackend.dto;

import lombok.Data;

@Data
public class CategoryDTO {

    private Integer id;
    private String name;
    private String description;
    private CategoryDTO parentCategory;
}
