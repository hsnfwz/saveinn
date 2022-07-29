package com.example.budget.exception;

public class NotFound extends RuntimeException{

    public NotFound(String error){
        System.out.println(this+" "+error+" not found");
    }
}
