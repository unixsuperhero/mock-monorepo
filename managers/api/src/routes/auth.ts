import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { EmployeeService } from '../services/employeeService';

export const authRoutes = Router();
const employeeService = new EmployeeService();

const JWT_SECRET = process.env.JWT_SECRET || 'manager-dev-secret';
const passwords: Map<string, string> = new Map();

authRoutes.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const employee = await employeeService.findByEmail(email);
    if (!employee) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const hashedPassword = passwords.get(employee.id);
    if (!hashedPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        userId: employee.id,
        email: employee.email,
        role: employee.role,
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: employee.id,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        role: employee.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRoutes.post('/change-password', async (req, res, next) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const hashedCurrent = passwords.get(userId);
    if (!hashedCurrent) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(currentPassword, hashedCurrent);
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    passwords.set(userId, hashedNew);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
});
