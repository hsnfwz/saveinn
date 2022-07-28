package com.example.budget.repository;

import com.example.budget.entity.BudgetPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BudgetPlanRepository extends JpaRepository<BudgetPlan,Integer> {
}
