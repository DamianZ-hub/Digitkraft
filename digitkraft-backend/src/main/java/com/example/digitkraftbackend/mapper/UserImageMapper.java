package com.example.digitkraftbackend.mapper;

import com.example.digitkraftbackend.dto.UserImageDTO;
import com.example.digitkraftbackend.model.UserImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserImageMapper {

    UserImageDTO userImageToUserImageDTO(UserImage userImage);
}
