package com.example.budget.service;


import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.BudgetMember;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.BudgetMemberMapper;
import com.example.budget.payload.BudgetMemberDto;
import com.example.budget.repository.BudgetMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BudgetMemberService  implements GenericCrudService<Apiresponse, BudgetMemberDto,Integer> {
final BudgetMemberRepository budgetMemberRepository;
final BudgetMemberMapper mapper;
    @Override
    public Apiresponse getAll() {
        List<BudgetMember> all = budgetMemberRepository.findAll();
        return new Apiresponse("All",true,all);

    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<BudgetMember> byId = budgetMemberRepository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        return new Apiresponse("found",true,byId.get());
    }

    @Override
    public Apiresponse create(BudgetMemberDto dto) {
        BudgetMember budgetMember = mapper.toBudgetMember(dto);
        BudgetMember save = budgetMemberRepository.save(budgetMember);
        return new Apiresponse("created",true,save);
    }

    @Override
    public Apiresponse update(Integer id, BudgetMemberDto dto) {
        Optional<BudgetMember> byId = budgetMemberRepository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        BudgetMember save = budgetMemberRepository.save(byId.get());
        return new Apiresponse("Updated",true,save);

    }

    @Override
    public Apiresponse delete(Integer id) {
        budgetMemberRepository.deleteById(id);
        return new Apiresponse("deleted",true);
    }
}
