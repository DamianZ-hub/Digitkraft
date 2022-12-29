package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.CategoryDTO;
import com.example.digitkraftbackend.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    CategoryDTO categoryToCategoryDTO(Category category);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "parentCategory", ignore = true)
    Category categoryDTOToCategory(CategoryDTO categoryDTO);
}
