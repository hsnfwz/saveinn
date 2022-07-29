package com.example.budget.controller;

import com.example.budget.dao.Apiresponse;
import com.example.budget.payload.ExpenseDto;
import com.example.budget.service.ExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/question")
public class QuestionController {
    final ExpenseService service;
    @GetMapping
    public Apiresponse getAllAnswers(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    public Apiresponse getOne( @PathVariable Integer id){
        return service.getOne(id);
    }

    @PostMapping
    public Apiresponse create(@RequestBody ExpenseDto dto){
        return service.create(dto);
    }
    @PutMapping("/{id}")
    public Apiresponse update(@PathVariable Integer id, @RequestBody ExpenseDto dto){
        return service.update(id,dto);
    }
    @DeleteMapping("/{id}")
    public Apiresponse delete(@PathVariable Integer id){
        return service.delete(id);
    }
}
