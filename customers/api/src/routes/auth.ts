import { Router } from 'express';
import { AuthService } from '../services/authService';
import { validateBody } from '../middleware/validation';

export const authRoutes = Router();
const authService = new AuthService();

authRoutes.post('/login', validateBody(['email', 'password']), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/register', validateBody(['email', 'password', 'firstName', 'lastName']), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/refresh', validateBody(['refreshToken']), async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/logout', async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});
