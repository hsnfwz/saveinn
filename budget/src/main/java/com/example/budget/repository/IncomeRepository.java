package com.example.budget.repository;

import com.example.budget.dao.Apiresponse;
import com.example.budget.entity.Income;
import com.example.budget.payload.IncomeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncomeRepository extends JpaRepository<Income,Integer> {
}
