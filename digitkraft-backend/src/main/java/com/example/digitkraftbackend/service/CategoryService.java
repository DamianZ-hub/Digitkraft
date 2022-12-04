package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.CategoryDTO;
import com.example.digitkraftbackend.mapper.CategoryMapper;
import com.example.digitkraftbackend.model.Category;
import com.example.digitkraftbackend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDTO> getAllCategories() {
        List<Category> productList = categoryRepository.findAllByOrderByName();
        log.info("Successfully find all categories from database");
        return productList.stream().map(categoryMapper::categoryToCategoryDTO).toList();
    }
}
