import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/customerService';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../models/Customer';

const customerService = new CustomerService();

export const getCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const customers = await customerService.findAll(
      Number(page),
      Number(limit)
    );
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await customerService.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: CreateCustomerDTO = req.body;
    const customer = await customerService.create(data);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: UpdateCustomerDTO = req.body;
    const customer = await customerService.update(req.params.id, data);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await customerService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
