package com.example.digitkraftbackend.model;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "copies")
public class Copy {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String code;

    private Boolean available;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @Override
    public String toString() {
        return "Copy{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", available=" + available +
                ", product=" + product +
                ", order=" + order +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Copy copy = (Copy) o;
        return Objects.equals(id, copy.id) && Objects.equals(code, copy.code) && Objects.equals(available, copy.available) && Objects.equals(product, copy.product) && Objects.equals(order, copy.order);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, code, available, product, order);
    }
}
