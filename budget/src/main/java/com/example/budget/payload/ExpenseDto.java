package com.example.budget.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class ExpenseDto {
    private String category;
    private Integer amount;
    private String description;
    private String title;
}
