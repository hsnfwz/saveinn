package com.example.budget.controller;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.User;
import com.example.budget.mapper.UserMapper;
import com.example.budget.payload.LoginDto;
import com.example.budget.payload.UserDto;
import com.example.budget.repository.UserRepository;
import com.example.budget.security.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    final UserRepository repository;
    final UserMapper mapper;
    final JwtProvider jwtProvider;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginDto loginDto){
        String token=jwtProvider.generateToken(loginDto.getUsername());
        return ResponseEntity.ok().body(token);
    }

    @GetMapping
    @PreAuthorize(value = "hasRole('ADMINISTARTOR')")
    public Apiresponse getAllUser() {
        List<User> all = repository.findAll();
        return new Apiresponse("All", true, all);
    }

    @GetMapping("/{id}")
    @PreAuthorize(value = "hasRole('ADMINISTARTOR')")
    public Apiresponse getOne(@PathVariable Integer id) {
        Optional<User> byId = repository.findById(id);
        return new Apiresponse("Found", true, byId.get());
    }

    @PostMapping
    @PreAuthorize(value = "hasRole('ADMINISTARTOR')")

    public Apiresponse create(@RequestBody UserDto dto) {
        User user = mapper.toUser(dto);
        User save = repository.save(user);
        return new Apiresponse("success", true, save);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(value = "hasRole('ADMINISTARTOR')")

    public Apiresponse delete(@PathVariable Integer id) {
        repository.deleteById(id);
        return new Apiresponse("deleted", true);
    }
}
