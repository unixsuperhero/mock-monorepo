import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CustomerService } from './customerService';
import { CreateCustomerDTO } from '../models/Customer';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key';
const JWT_EXPIRES_IN = '1h';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

interface TokenPayload {
  userId: string;
  email: string;
}

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export class AuthService {
  private customerService = new CustomerService();
  private passwords: Map<string, string> = new Map();

  async register(data: CreateCustomerDTO): Promise<AuthResult> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const customer = await this.customerService.create(data);
    this.passwords.set(customer.id, hashedPassword);

    return this.generateTokens(customer);
  }

  async login(email: string, password: string): Promise<AuthResult> {
    const customer = await this.customerService.findByEmail(email);
    if (!customer) {
      throw new Error('Invalid credentials');
    }

    const hashedPassword = this.passwords.get(customer.id);
    if (!hashedPassword) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, hashedPassword);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return this.generateTokens(customer);
  }

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, JWT_SECRET) as TokenPayload;
      const accessToken = jwt.sign(
        { userId: payload.userId, email: payload.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      return { accessToken };
    } catch {
      throw new Error('Invalid refresh token');
    }
  }

  private generateTokens(customer: any): AuthResult {
    const payload: TokenPayload = {
      userId: customer.id,
      email: customer.email,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    return {
      accessToken,
      refreshToken,
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    };
  }
}
