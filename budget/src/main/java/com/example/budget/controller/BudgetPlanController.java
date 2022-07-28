package com.example.budget.controller;


import com.example.budget.dao.Apiresponse;
import com.example.budget.payload.BudgetGoalDto;
import com.example.budget.payload.BudgetPlanDto;
import com.example.budget.service.BudgetPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/budgetPlan")
public class BudgetPlanController {
final BudgetPlanService service;

    @GetMapping
    @PreAuthorize(value = "hasAnyRole('BUDGET_MEMBER','ADMINISTRATOR')")
    public Apiresponse getAllAnswers(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    @PreAuthorize(value = "hasAnyRole('BUDGET_MEMBER','ADMINISTRATOR')")
    public Apiresponse getOne( @PathVariable Integer id){
        return service.getOne(id);
    }

    @PostMapping
    @PreAuthorize(value = "hasAnyRole('BUDGET_MEMBER','ADMINISTRATOR')")
    public Apiresponse create(@RequestBody BudgetPlanDto dto){
        return service.create(dto);
    }
    @PutMapping("/{id}")
    public Apiresponse update(@PathVariable Integer id, @RequestBody BudgetPlanDto dto){
        return service.update(id,dto);
    }
    @PreAuthorize(value = "hasAnyRole('BUDGET_MEMBER','ADMINISTRATOR')")
    @DeleteMapping("/{id}")
    public Apiresponse delete(@PathVariable Integer id){
        return service.delete(id);
    }
}
