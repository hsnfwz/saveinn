package com.example.budget.mapper;


import com.example.budget.entity.BudgetMember;
import com.example.budget.payload.BudgetMemberDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {BudgetMemberMapper.class})
public interface BudgetMemberMapper {
    BudgetMember toBudgetMember(BudgetMemberDto dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    BudgetMember fromUpdate(BudgetMemberDto dto,@MappingTarget BudgetMember budgetMember);
}
