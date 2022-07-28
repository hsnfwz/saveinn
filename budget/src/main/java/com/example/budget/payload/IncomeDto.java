package com.example.budget.payload;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IncomeDto {
    private Integer amount;
    private String description;
    private String title;
    private String category;
}
