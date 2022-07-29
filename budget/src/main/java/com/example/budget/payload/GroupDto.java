package com.example.budget.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GroupDto {
    private String name;
    private String description;
    private boolean isPublic;
}
