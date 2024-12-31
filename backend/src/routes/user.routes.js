import express from 'express';
import { register, list, login, expenses, logout, newContact, contacts, dashboardData } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/list', list);
userRouter.get("/expenses/:userId", authenticate, expenses);
userRouter.get("/contacts/:userId", authenticate, contacts);
userRouter.get("/dashboardData/:userId", authenticate, dashboardData);  

userRouter.post('/register', register);
userRouter.post("/login", login);
userRouter.post("/logout", authenticate, logout);
userRouter.post("/newContact", authenticate, newContact);

export default userRouter;