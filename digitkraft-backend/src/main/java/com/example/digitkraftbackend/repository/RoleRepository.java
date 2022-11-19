package com.example.digitkraftbackend.repository;

import com.example.digitkraftbackend.constant.RoleType;
import com.example.digitkraftbackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType roleType);
}
