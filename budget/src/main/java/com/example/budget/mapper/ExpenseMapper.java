package com.example.budget.mapper;

import com.example.budget.entity.Expense;
import com.example.budget.payload.ExpenseDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", uses = {ExpenseMapper.class})
public interface ExpenseMapper {
    Expense toExpense(ExpenseDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Expense fromUpdate(ExpenseDto dto,@MappingTarget  Expense expense);

}
