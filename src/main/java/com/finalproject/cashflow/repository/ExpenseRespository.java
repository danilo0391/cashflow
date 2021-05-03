package com.finalproject.cashflow.repository;

import com.finalproject.cashflow.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRespository extends JpaRepository<Expense, Long> {
}
