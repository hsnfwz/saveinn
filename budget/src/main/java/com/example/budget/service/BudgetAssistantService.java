package com.example.budget.service;


import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.BudgetAssistant;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.BudgetAssistantMapper;
import com.example.budget.payload.BudgetAssistantDto;
import com.example.budget.repository.BudgetAssistantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetAssistantService implements GenericCrudService<Apiresponse, BudgetAssistantDto,Integer> {

    final BudgetAssistantRepository repository;
    final BudgetAssistantMapper mapper;
    @Override
    public Apiresponse getAll() {
        List<BudgetAssistant> all = repository.findAll();
        return new Apiresponse("All",true,all);
    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<BudgetAssistant> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        return new Apiresponse("found",true,byId.get());

    }

    @Override
    public Apiresponse create(BudgetAssistantDto dto) {
        BudgetAssistant budgetAssistant = mapper.toBudgetAssistant(dto);
        BudgetAssistant save = repository.save(budgetAssistant);
        return new Apiresponse("created",true,save);

    }

    @Override
    public Apiresponse update(Integer id, BudgetAssistantDto dto) {
        Optional<BudgetAssistant> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        BudgetAssistant save = repository.save(byId.get());
        return new Apiresponse("Updated",true,save);
    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);
    }
}
