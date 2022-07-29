package com.example.budget.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class BudgetGoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer budgetGoalId;
    private Timestamp startDate;
    private Timestamp endDate;
    private Integer amountSaved;
    private String description;
    private String name;


}
