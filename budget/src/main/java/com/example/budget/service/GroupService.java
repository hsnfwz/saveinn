package com.example.budget.service;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Group;
import com.example.budget.interfaces.GenericCrudService;
import com.example.budget.mapper.GroupMapper;
import com.example.budget.payload.GroupDto;
import com.example.budget.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupService  implements GenericCrudService<Apiresponse, GroupDto,Integer> {
    final GroupRepository repository;
    final GroupMapper mapper;
    @Override
    public Apiresponse getAll() {
        return new Apiresponse("All",true,repository.findAll());
    }

    @Override
    public Apiresponse getOne(Integer id) {
        Optional<Group> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("Not found",false);
        }
        return new Apiresponse("found",true,byId.get());
   }

    @Override
    public Apiresponse create(GroupDto dto) {
        Group group = mapper.toGroup(dto);
        Group save = repository.save(group);
        return new Apiresponse("created",true,save);
    }

    @Override
    public Apiresponse update(Integer id, GroupDto dto) {
        Optional<Group> byId = repository.findById(id);
        if(byId.isEmpty()){
            return new Apiresponse("not found",false);
        }
        mapper.fromUpdate(dto,byId.get());
        Group save = repository.save(byId.get());
        return new Apiresponse("Updated",true,save);


    }

    @Override
    public Apiresponse delete(Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleeted",true);
    }
}
