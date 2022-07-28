package com.example.budget.controller;

import com.example.budget.dao.Apiresponse;
import com.example.budget.payload.BudgetAssistantDto;
import com.example.budget.payload.BudgetMemberDto;
import com.example.budget.repository.BudgetMemberRepository;
import com.example.budget.service.BudgetAssistantService;
import com.example.budget.service.BudgetMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/budgetAssistant")
public class BudgetAssistantController {
    final BudgetAssistantService service;
    @GetMapping
    public Apiresponse getAll(){
        Apiresponse all = service.getAll();
        return new Apiresponse("Success",true,all);
    }
    @GetMapping("/{id}")
    @PreAuthorize(value = "hasRole('BUDGET_MEMBER')")
    public Apiresponse getOne( @PathVariable Integer id){
        return service.getOne(id);
    }

    @PostMapping
    @PreAuthorize(value = "hasRole('ADMINISTRATOR')")
    public Apiresponse create(@RequestBody BudgetAssistantDto dto){
        return service.create(dto);
    }


    @PutMapping("/{id}")
    @PreAuthorize(value = "hasRole('ADMINISTRATOR')")

    public Apiresponse update(@PathVariable Integer id, @RequestBody BudgetAssistantDto dto){
        return service.update(id,dto);
    }


    @PreAuthorize(value = "hasRole('ADMINISTRATOR')")

    @DeleteMapping("/{id}")
    public Apiresponse delete(@PathVariable Integer id){
        return service.delete(id);
    }
}
