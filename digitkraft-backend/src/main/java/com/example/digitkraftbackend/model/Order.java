package com.example.digitkraftbackend.model;

import com.example.digitkraftbackend.model.utils.OrderStatus;
import com.example.digitkraftbackend.model.utils.PaymentMethod;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private OrderStatus orderStatus;

    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name="shipment_id")
    private Shipment shipment;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="contact_info_id")
    private ContactInfo contactInfo;

    @ManyToOne
    @JoinColumn(name="address_id")
    private Address address;

    @Column(unique=true)
    private String code;

    @Column(name = "send_date", columnDefinition = "DATE")
    private LocalDate sendDate;

    @Column(name = "placement_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime placementDate;

    private String additionalNotes;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Order product = (Order) o;
        return id != null && Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
