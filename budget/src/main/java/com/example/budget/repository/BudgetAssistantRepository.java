package com.example.budget.repository;

import com.example.budget.entity.BudgetAssistant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetAssistantRepository extends JpaRepository<BudgetAssistant,Integer> {
Optional<BudgetAssistant> findByUsername(String userName);
}
