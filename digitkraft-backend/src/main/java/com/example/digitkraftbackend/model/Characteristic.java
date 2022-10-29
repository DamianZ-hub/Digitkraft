package com.example.digitkraftbackend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;


@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "characteristics")
public class Characteristic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "char_name")
    private String name;

    @Column(name = "char_value")
    private String value;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Override
    public String toString() {
        return "Characteristic{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", value='" + value + '\'' +
                ", product=" + product +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Characteristic that = (Characteristic) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(value, that.value) && Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, value, product);
    }
}
