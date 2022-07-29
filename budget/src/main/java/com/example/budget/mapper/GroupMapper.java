package com.example.budget.mapper;

import com.example.budget.entity.Group;
import com.example.budget.payload.GroupDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {GroupMapper.class})
public interface GroupMapper {

    Group toGroup(GroupDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Group fromUpdate(GroupDto dto,@MappingTarget Group group);
}
