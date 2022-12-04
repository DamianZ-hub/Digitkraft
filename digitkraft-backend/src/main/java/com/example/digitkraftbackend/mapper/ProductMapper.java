package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.ProductDTO;
import com.example.digitkraftbackend.model.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {CopyMapper.class, ProductMapper.class})
public interface ProductMapper {

    @Mapping(source = "copies", target = "copies", qualifiedByName = "copyToSimpleCopyDTO")
    ProductDTO productToProductDTO(Product product);

    Product productDTOToProduct(ProductDTO productDTO);
}
