package com.example.digitkraftbackend.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contact_infos")
public class ContactInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique = true)
    private String telNumber;

    @Column(unique = true)
    private String email;

    @Override
    public String toString() {
        return "ContactInfo{" +
                "id=" + id +
                ", telNumber='" + telNumber + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContactInfo contactInfo = (ContactInfo) o;
        return id != null && id.equals(contactInfo.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
