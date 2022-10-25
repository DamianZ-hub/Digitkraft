package com.example.digitkraftbackend;

import com.example.digitkraftbackend.model.Product;
import com.example.digitkraftbackend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DigitkraftBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(DigitkraftBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner initializeData(ProductRepository repo) {
		return args -> {

			repo.save(new Product());
		};
	}

}
