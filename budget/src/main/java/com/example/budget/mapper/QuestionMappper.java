package com.example.budget.mapper;

import com.example.budget.entity.Question;
import com.example.budget.payload.QuestionDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {QuestionMappper.class})
public interface QuestionMappper {

    Question toQuestion(QuestionDto dto);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Question fromUpdate(QuestionDto dto,@MappingTarget Question question);
}
