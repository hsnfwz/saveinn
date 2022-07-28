package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.BudgetPlan;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.BudgetPlanMapper;
import com.example.budget.payload.BudgetPlanDto;
import com.example.budget.repository.BudgetPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetPlanService implements GenericCrudService<Apiresponse, BudgetPlanDto,Integer> {

    final BudgetPlanRepository repository;
    final BudgetPlanMapper mapper;
    @Override
    public Apiresponse getAll() {
        List<BudgetPlan> all = repository.findAll();
        return new Apiresponse("All",true,all);

    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<BudgetPlan> byId = repository.findById(id);
        if (byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        return new Apiresponse("Found",true,byId.get());
    }

    @Override
    public Apiresponse create(BudgetPlanDto dto) {
        BudgetPlan budgetPlan = mapper.toBudgetPlan(dto);
        BudgetPlan save = repository.save(budgetPlan);
        return new Apiresponse("created",true,save);

    }

    @Override
    public Apiresponse update(Integer id, BudgetPlanDto dto) {
        Optional<BudgetPlan> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        BudgetPlan save = repository.save(byId.get());
        return new Apiresponse("updated",true,save);
    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted",true);

    }
}
