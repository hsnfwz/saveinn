package com.example.budget.controller;

import com.example.budget.dao.Apiresponse;
import com.example.budget.payload.ExpenseDto;
import com.example.budget.payload.IncomeDto;
import com.example.budget.service.ExpenseService;
import com.example.budget.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/income")
public class IncomeController {
    final IncomeService service;
    @GetMapping
    public Apiresponse getAllAnswers(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    public Apiresponse getOne( @PathVariable Integer id){
        return service.getOne(id);
    }

    @PostMapping
    public Apiresponse create(@RequestBody IncomeDto dto){
        return service.create(dto);
    }
    @PutMapping("/{id}")
    public Apiresponse update(@PathVariable Integer id, @RequestBody IncomeDto dto){
        return service.update(id,dto);
    }
    @DeleteMapping("/{id}")
    public Apiresponse delete(@PathVariable Integer id){
        return service.delete(id);
    }
}
