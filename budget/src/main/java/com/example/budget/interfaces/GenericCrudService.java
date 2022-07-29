package com.example.budget.interfaces;

public interface GenericCrudService <T,D,E>{
//T-generic object type
//D generic parametr type
T getAll();
T getOne(E id);
T create(D dto);
T update(E id,D dto);
T delete(E id);
}
