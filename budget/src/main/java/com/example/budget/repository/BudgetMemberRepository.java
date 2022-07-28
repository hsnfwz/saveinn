package com.example.budget.repository;

import com.example.budget.entity.BudgetMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BudgetMemberRepository extends JpaRepository<BudgetMember,Integer> {
Optional<BudgetMember> findByUsername(String userName);
}
