package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.CopyDTO;
import com.example.digitkraftbackend.model.Copy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface CopyMapper {

    CopyDTO copyToCopyDTO(Copy copy);

    @Named("copyToSimpleCopyDTO")
    @Mapping(target = "product", ignore = true)
    @Mapping(target = "order", ignore = true)
    CopyDTO copyToSimpleCopyDTO(Copy copy);
}
