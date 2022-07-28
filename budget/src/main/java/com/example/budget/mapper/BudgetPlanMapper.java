package com.example.budget.mapper;


import com.example.budget.entity.BudgetPlan;
import com.example.budget.payload.BudgetPlanDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {BudgetPlanMapper.class})
public interface BudgetPlanMapper {
    BudgetPlan toBudgetPlan(BudgetPlanDto dto);

//    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BudgetPlan fromUpdate(BudgetPlanDto dto,@MappingTarget BudgetPlan budgetPlan);
}
