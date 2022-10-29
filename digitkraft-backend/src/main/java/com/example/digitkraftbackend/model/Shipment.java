package com.example.digitkraftbackend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private Double price;

    @Override
    public String toString() {
        return "Shipment{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Shipment shipment = (Shipment) o;
        return Objects.equals(id, shipment.id) && Objects.equals(name, shipment.name) && Objects.equals(price, shipment.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price);
    }
}
