package com.example.digitkraftbackend.repository;

import com.example.digitkraftbackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> findAllByOrderByName();
    Optional<Category> findByNameIgnoreCase(String name);
}
