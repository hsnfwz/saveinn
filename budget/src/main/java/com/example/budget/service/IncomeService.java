package com.example.budget.service;


import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Income;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.IncomeMapper;
import com.example.budget.payload.IncomeDto;
import com.example.budget.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncomeService implements GenericCrudService<Apiresponse, IncomeDto,Integer> {
    final IncomeRepository repository;
    final IncomeMapper mapper;
    @Override
    public Apiresponse getAll() {
        return new Apiresponse("All",true,repository.findAll());
    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<Income> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        return new Apiresponse("Found",true,byId.get());

    }

    @Override
    public Apiresponse create(IncomeDto dto) {
        Income income = mapper.toIncome(dto);
        Income save = repository.save(income);
        return new Apiresponse("Created",true,save);

    }

    @Override
    public Apiresponse update(Integer id, IncomeDto dto) {
        Optional<Income> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        Income save = repository.save(byId.get());
        return new Apiresponse("Updated",true,save);

    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);
    }
}
