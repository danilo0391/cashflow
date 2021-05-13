package com.finalproject.cashflow.controller;

import com.finalproject.cashflow.exceptions.ResourceNotFoundException;
import com.finalproject.cashflow.model.Expense;
import com.finalproject.cashflow.repository.ExpenseRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ExpenseController {

    @Autowired
    private ExpenseRespository expenseRespository;

    @GetMapping("/expenses")
    public List<Expense> getAllExpense(){
        return expenseRespository.findAll();
    }

    @GetMapping("/expenses/{id}")
    public Expense getExpenseById(@PathVariable(value = "id") Long id){
        return expenseRespository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Expense not found")
        );
    }

    @PostMapping("/expenses")
    public Expense addExpense(@RequestBody Expense expense){
        return expenseRespository.save(expense);
    }

    @PutMapping("/expenses/{id}")
    public Expense updateExpense(@RequestBody Expense newExpense, @PathVariable(value = "id") Long id){
        return expenseRespository.findById(id)
                .map(expense -> {
                    expense.setDescription(newExpense.getDescription());
                    expense.setDate(newExpense.getDate());
                    expense.setValue(newExpense.getValue());
                    expense.setCategory(newExpense.getCategory());
                    return expenseRespository.save(expense);
                })
                .orElseGet(()->{
                    newExpense.setId(id);
                    return expenseRespository.save(newExpense);
                });
    }

    @DeleteMapping("expenses/{id}")
    public void deleteExpense(@PathVariable(value = "id") Long id){
        Expense expense = expenseRespository.findById(id).orElseThrow(
                ()-> new ResourceNotFoundException("Expense not found")
        );
        expenseRespository.delete(expense);
    }
}
