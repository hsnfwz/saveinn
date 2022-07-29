package com.example.budget.repository;

import com.example.budget.entity.BudgetGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetGoalRepository extends JpaRepository<BudgetGoal,Integer> {
}
