package com.example.digitkraftbackend.model;

import com.example.digitkraftbackend.model.utils.OrderStatus;
import com.example.digitkraftbackend.model.utils.PaymentMethod;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @ManyToOne
    @JoinColumn(name = "shipment_id")
    private Shipment shipment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "contact_info_id")
    private ContactInfo contactInfo;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(unique = true)
    private String code;

    @Column(name = "send_date", columnDefinition = "DATE")
    private LocalDate sendDate;

    @Column(name = "placement_date", columnDefinition = "TIMESTAMP")
    private LocalDateTime placementDate;

    private String additionalNotes;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderStatus=" + orderStatus +
                ", paymentMethod=" + paymentMethod +
                ", shipment=" + shipment +
                ", user=" + user +
                ", contactInfo=" + contactInfo +
                ", address=" + address +
                ", code='" + code + '\'' +
                ", sendDate=" + sendDate +
                ", placementDate=" + placementDate +
                ", additionalNotes='" + additionalNotes + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Objects.equals(id, order.id) && orderStatus == order.orderStatus && paymentMethod == order.paymentMethod && Objects.equals(shipment, order.shipment) && Objects.equals(user, order.user) && Objects.equals(contactInfo, order.contactInfo) && Objects.equals(address, order.address) && Objects.equals(code, order.code) && Objects.equals(sendDate, order.sendDate) && Objects.equals(placementDate, order.placementDate) && Objects.equals(additionalNotes, order.additionalNotes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderStatus, paymentMethod, shipment, user, contactInfo, address, code, sendDate, placementDate, additionalNotes);
    }
}
