package com.example.budget.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Apiresponse {
    private String message;
    private Boolean succes;
    private Object object;

    public Apiresponse(String message, Boolean succes) {
        this.message = message;
        this.succes = succes;
    }
}
