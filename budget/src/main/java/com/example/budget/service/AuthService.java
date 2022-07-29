package com.example.budget.service;

import com.example.budget.entity.BudgetAssistant;
import com.example.budget.entity.BudgetMember;
import com.example.budget.entity.User;
import com.example.budget.exception.NotFound;
import com.example.budget.repository.BudgetAssistantRepository;
import com.example.budget.repository.BudgetMemberRepository;
import com.example.budget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BudgetAssistantRepository budgetAssistantRepository;

    @Autowired
    BudgetMemberRepository budgetMemberRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(username);
        Optional<BudgetMember> byUsername1 = budgetMemberRepository.findByUsername(username);
        Optional<BudgetAssistant> byUsername2 = budgetAssistantRepository.findByUsername(username);
        if(byUsername.isPresent()){
            return  userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException(username));
        }
        if(byUsername1.isPresent()){
            return budgetMemberRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        }
        if(byUsername2.isPresent()){
            return budgetAssistantRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        }
        return null;

    }
}
