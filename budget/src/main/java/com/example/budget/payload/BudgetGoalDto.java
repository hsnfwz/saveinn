package com.example.budget.payload;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BudgetGoalDto {
    private Timestamp startDate;
    private Timestamp endDate;
    private Integer amountSaved;
    private String description;
    private String name;
}
