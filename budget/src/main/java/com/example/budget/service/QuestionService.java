package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Question;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.QuestionMappper;
import com.example.budget.payload.QuestionDto;
import com.example.budget.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService  implements GenericCrudService<Apiresponse, QuestionDto,Integer> {
    final QuestionRepository repository;
    final QuestionMappper mappper;
    @Override
    public Apiresponse getAll() {
        return new Apiresponse("All",true,repository.findAll());
    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<Question> byId = repository.findById(id);
        if(byId.isEmpty()){
            return  new Apiresponse("Not found",false);
        }
        return new Apiresponse("found",true,byId.get());

    }

    @Override
    public Apiresponse create(QuestionDto dto) {
        Question question = mappper.toQuestion(dto);
        Question save = repository.save(question);
        return new Apiresponse("Created",true,save);
    }

    @Override
    public Apiresponse update(Integer id, QuestionDto dto) {
        Optional<Question> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mappper.fromUpdate(dto,byId.get());
        Question save = repository.save(byId.get());
        return new Apiresponse("Updated",true,save);

    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);
    }
}
