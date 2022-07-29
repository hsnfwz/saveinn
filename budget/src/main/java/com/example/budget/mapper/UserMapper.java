package com.example.budget.mapper;


import com.example.budget.entity.User;
import com.example.budget.payload.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",uses = {UserMapper.class})
public interface UserMapper {
    User toUser(UserDto dto);
}
