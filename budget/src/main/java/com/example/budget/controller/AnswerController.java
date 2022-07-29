package com.example.budget.controller;

import com.example.budget.dao.Apiresponse;
import com.example.budget.payload.AnswerDto;
import com.example.budget.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answer")
@RequiredArgsConstructor
public class AnswerController {
  final AnswerService service;
    @GetMapping
    public Apiresponse getAllAnswers(){
        return service.getAll();
    }
    @GetMapping("/{id}")
    public Apiresponse getOne( @PathVariable Integer id){
        return service.getOne(id);
    }

    @PostMapping
    public Apiresponse create(@RequestBody AnswerDto dto){
        return service.create(dto);
    }
    @PutMapping("/{id}")
    public Apiresponse update(@PathVariable Integer id, @RequestBody AnswerDto dto){
        return service.update(id,dto);
    }
    @DeleteMapping("/{id}")
    public Apiresponse delete(@PathVariable Integer id){
        return service.delete(id);
    }
}
