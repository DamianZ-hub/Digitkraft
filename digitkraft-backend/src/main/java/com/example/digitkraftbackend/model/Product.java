package com.example.digitkraftbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotNull
    private Long code;

    @NotNull
    private Boolean available;

    @ManyToOne
    @JoinColumn(name="product_type_id")
    @NotNull
    private ProductType productType;

}
