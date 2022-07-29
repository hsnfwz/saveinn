package com.example.budget.mapper;


import com.example.budget.entity.Income;
import com.example.budget.payload.IncomeDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {IncomeMapper.class})
public interface IncomeMapper {
    Income toIncome(IncomeDto dto);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Income fromUpdate(IncomeDto dto,@MappingTarget  Income income);
}
