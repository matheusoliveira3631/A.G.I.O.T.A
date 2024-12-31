import { addExpense, removeExpense, balance} from "../controllers/expenseController.js";
import express from 'express';
import { authenticate } from "../middleware/auth.js";

const expenseRouter = express.Router();

expenseRouter.get('/balance/:userId', authenticate, balance);

expenseRouter.post('/add', authenticate, addExpense);

expenseRouter.delete('/remove/:id', authenticate, removeExpense);


export default expenseRouter;