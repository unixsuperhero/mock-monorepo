import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { EmployeeRole } from '../models/Employee';

const JWT_SECRET = process.env.JWT_SECRET || 'manager-dev-secret';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: EmployeeRole;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Invalid authorization format' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
      role: EmployeeRole;
    };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
