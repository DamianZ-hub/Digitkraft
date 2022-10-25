package com.example.digitkraftbackend.model;

import lombok.*;
import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String username;

    private String firstname;

    private String lastname;

    private String password;

    private boolean enabled;

    @OneToOne
    @JoinColumn(name="contact_info_id")
    private ContactInfo contactInfo;

    @ManyToOne
    @JoinColumn(name="address_id")
    private Address address;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

}
