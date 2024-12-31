import { createExpense, deleteExpense, totalExpenseBalance } from "../services/expenseService.js";

export const addExpense = async (req, res) => {
    try {
        const expense = await createExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const removeExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await deleteExpense(parseInt(id));
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const balance = async (req, res) => {
    try {
        const { userId } = req.params;
        const balance = await totalExpenseBalance(parseInt(userId));
        res.status(200).json(balance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}