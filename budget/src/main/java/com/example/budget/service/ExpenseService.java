package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Expense;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.ExpenseMapper;
import com.example.budget.payload.ExpenseDto;
import com.example.budget.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExpenseService implements GenericCrudService<Apiresponse, ExpenseDto,Integer> {
    final ExpenseRepository repository;
    final ExpenseMapper mapper;
    @Override
    public Apiresponse getAll() {
        return new Apiresponse("All",true,repository.findAll());
    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<Expense> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("not found",false);
        }
        return new Apiresponse("found",true,repository.findById(id));

    }

    @Override
    public Apiresponse create(ExpenseDto dto) {
        Expense expense = mapper.toExpense(dto);
        Expense save = repository.save(expense);
        return new Apiresponse("Created",true,save);
    }

    @Override
    public Apiresponse update(Integer id, ExpenseDto dto) {
        Optional<Expense> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        Expense save = repository.save(byId.get());
        return new Apiresponse("Updated",true,save);
    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);

    }
}
