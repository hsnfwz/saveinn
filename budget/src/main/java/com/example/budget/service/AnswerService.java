package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Answer;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.AnswerMapper;
import com.example.budget.payload.AnswerDto;
import com.example.budget.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService implements GenericCrudService<Apiresponse, AnswerDto,Integer> {
    final AnswerRepository repository;
    final AnswerMapper mapper;
    @Override
    public Apiresponse getAll() {
        List<Answer> all = repository.findAll();
        return new Apiresponse("All answers",true,all);

    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<Answer> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("not found",false);
        }
        Answer answer = byId.get();
        return new Apiresponse("Found",true,answer);

    }

    @Override
    public Apiresponse create(AnswerDto dto) {
        Answer answer = mapper.toAnswer(dto);
        Answer save = repository.save(answer);
        return new Apiresponse("Added",true,save);
    }

    @Override
    public Apiresponse update(Integer id, AnswerDto dto) {
        Optional<Answer> OptionalAnswer = repository.findById(id);
        if(OptionalAnswer.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        Answer answer = OptionalAnswer.get();
        mapper.fromUpdate(dto,answer);
        Answer save = repository.save(answer);
        return new Apiresponse("Updated",true,save);
    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);

    }

}
