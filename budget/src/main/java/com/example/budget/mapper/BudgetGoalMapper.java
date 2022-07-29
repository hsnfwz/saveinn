package com.example.budget.mapper;

import com.example.budget.entity.BudgetGoal;
import com.example.budget.payload.BudgetGoalDto;
import org.mapstruct.*;

@Mapper(componentModel = "spring",uses = {BudgetGoalMapper.class})
public interface BudgetGoalMapper {

    BudgetGoal toBudgetGoal(BudgetGoalDto budgetGoalDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BudgetGoal fromUpdate(BudgetGoalDto dto,@MappingTarget BudgetGoal budgetGoal);
}
