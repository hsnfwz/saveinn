package com.example.budget.mapper;


import com.example.budget.entity.Answer;
import com.example.budget.payload.AnswerDto;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring",uses = {AnswerMapper.class})
public interface AnswerMapper {

    Answer toAnswer(AnswerDto answerDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Answer fromUpdate(AnswerDto dto,@MappingTarget Answer answer);
}
