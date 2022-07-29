package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.BudgetGoal;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.BudgetGoalMapper;
import com.example.budget.payload.BudgetGoalDto;
import com.example.budget.repository.BudgetGoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetGoalService implements GenericCrudService<Apiresponse, BudgetGoalDto, Integer> {
    final BudgetGoalRepository repository;
    final BudgetGoalMapper mapper;

    @Override
    public Apiresponse getAll() {
        List<BudgetGoal> all = repository.findAll();
        return new Apiresponse("All", true, all);

    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<BudgetGoal> byId = repository.findById(id);
        if (byId.isPresent()) {
            BudgetGoal budgetGoal = byId.get();
            return new Apiresponse("success", true, budgetGoal);

        }
        return new Apiresponse("Not found", false);

    }

    @Override
    public Apiresponse create(BudgetGoalDto dto) {
        BudgetGoal budgetGoal = mapper.toBudgetGoal(dto);
        BudgetGoal save = repository.save(budgetGoal);
        return new Apiresponse("created", true, save);
    }

    @Override
    public Apiresponse update(Integer id, BudgetGoalDto dto) {
        Optional<BudgetGoal> byId = repository.findById(id);
        if(byId.isPresent()){
            BudgetGoal budgetGoal = byId.get();
            mapper.fromUpdate(dto,budgetGoal);
            BudgetGoal save = repository.save(budgetGoal);
            return new Apiresponse("Updated",true,save);
        }
        return new Apiresponse("Not found",false);
    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("Deleted",true);

    }
}
