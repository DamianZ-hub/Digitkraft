package com.example.digitkraftbackend.service;

import com.example.digitkraftbackend.dto.CategoryDTO;
import com.example.digitkraftbackend.exceptions.CategoryNotFoundException;
import com.example.digitkraftbackend.mapper.CategoryMapper;
import com.example.digitkraftbackend.model.Category;
import com.example.digitkraftbackend.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
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

    public void saveCategory(CategoryDTO categoryDTO) throws IOException, CategoryNotFoundException {

        Category category = categoryMapper.categoryDTOToCategory(categoryDTO);
        if (categoryDTO.getParentCategory() != null) {
            Integer parentCategoryId = categoryDTO.getParentCategory().getId();
            if (parentCategoryId == null) throw new IOException("Null category id");
            Category parentCategory = categoryRepository.findById(parentCategoryId).orElseThrow(() -> new CategoryNotFoundException("Could not find category with id: " + parentCategoryId));
            category.setParentCategory(parentCategory);
        }
        categoryRepository.save(category);
    }

    public void deleteCategory(Integer categoryId) throws IOException, CategoryNotFoundException {

        if (categoryId == null)
            throw new IOException("Null category id");

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Could not find category with id: " + categoryId));
        categoryRepository.delete(category);
    }

}
