import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/orderService';
import { CreateOrderDTO } from '../models/Order';

const orderService = new OrderService();

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId, status, page = 1, limit = 10 } = req.query;
    const orders = await orderService.findAll({
      customerId: customerId as string,
      status: status as string,
      page: Number(page),
      limit: Number(limit),
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderService.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: CreateOrderDTO = req.body;
    const order = await orderService.create(data);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    const order = await orderService.updateStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderService.cancel(req.params.id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};
