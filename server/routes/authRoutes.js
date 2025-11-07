
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

import { login, logout, me, register } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../utils/validator.js';





const authRoutes = express.Router();

authRoutes.post('/register', registerValidator, register);
authRoutes.post('/login', loginValidator, login);
authRoutes.post('/logout', logout);
authRoutes.get("/me", authMiddleware, me);


export default authRoutes;
