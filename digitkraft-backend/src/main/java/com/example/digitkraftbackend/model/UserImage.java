package com.example.digitkraftbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_images")
public class UserImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
