package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.ProductImageDTO;
import com.example.digitkraftbackend.model.ProductImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductImageMapper {

    ProductImageDTO ProductImageToProductImageDTO(ProductImage productImage);
}
