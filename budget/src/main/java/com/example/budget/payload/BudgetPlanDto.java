package com.example.budget.payload;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BudgetPlanDto {
    private String name;
    private String description;
    private Timestamp endDate;
        private Timestamp startDate;
}
