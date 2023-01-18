package com.example.digitkraftbackend.repository;

import com.example.digitkraftbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<Order> findAllByOrderByPlacementDateDesc();

    Order findByCode(String code);

    List<Order> findAllByUserIdOrderByPlacementDateDesc(Integer userId);
}
