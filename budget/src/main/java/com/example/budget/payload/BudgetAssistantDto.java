package com.example.budget.payload;


import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BudgetAssistantDto {

    private String username;
    private String email;
    private String password;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "area_of_expertise")
    private String areaOfExpertise;
    @Column(name = "postal_code")
    private String postalCode;
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;
}
