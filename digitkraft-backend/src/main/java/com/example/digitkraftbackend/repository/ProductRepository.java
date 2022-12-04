package com.example.digitkraftbackend.repository;

import com.example.digitkraftbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findAllByOrderByName();

    @Query("SELECT p FROM Product p " +
            "WHERE (:name is null or p.name like %:name%) " +
            "AND (:minPrice is null or p.price >= :minPrice)" +
            "AND (:maxPrice is null or p.price <= :maxPrice)" +
            "AND (:category is null or p.category.name like %:category%)")
    List<Product> searchProducts(@Param("name") String name,
                                 @Param("minPrice") Double minPrice,
                                 @Param("maxPrice") Double maxPrice,
                                 @Param("category") String category);
}
