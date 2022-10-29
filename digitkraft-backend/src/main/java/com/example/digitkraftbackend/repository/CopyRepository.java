package com.example.digitkraftbackend.repository;

import com.example.digitkraftbackend.model.ContactInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CopyRepository extends JpaRepository<ContactInfo, Integer> {

}
