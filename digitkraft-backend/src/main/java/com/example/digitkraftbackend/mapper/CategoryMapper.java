package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.CategoryDTO;
import com.example.digitkraftbackend.model.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDTO categoryToCategoryDTO(Category category);
}
