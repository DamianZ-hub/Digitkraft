package com.example.digitkraftbackend.controller;

import com.example.digitkraftbackend.dto.CategoryDTO;
import com.example.digitkraftbackend.exceptions.CategoryNotFoundException;
import com.example.digitkraftbackend.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public List<CategoryDTO> getAllCategories(){
        return categoryService.getAllCategories();
    }

    @PostMapping
    public String addCategory(@RequestBody CategoryDTO category) throws IOException, CategoryNotFoundException {
        categoryService.saveCategory(category);
        log.info("Category {} saved successfully", category);
        return "Category" + category + " saved successfully";
    }

    @DeleteMapping
    public String deleteCategory(@RequestParam Integer categoryId) throws IOException, CategoryNotFoundException {
        categoryService.deleteCategory(categoryId);
        log.info("Category {} deleted successfully", categoryId);
        return "Category with id: " + categoryId + " deleted successfully";
    }
}
