package com.example.budget.mapper;


import com.example.budget.entity.BudgetAssistant;
import com.example.budget.payload.BudgetAssistantDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {BudgetAssistantMapper.class})
public interface BudgetAssistantMapper {

    BudgetAssistant toBudgetAssistant(BudgetAssistantDto  dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BudgetAssistant fromUpdate(BudgetAssistantDto dto,@MappingTarget BudgetAssistant budgetAssistant);
}
