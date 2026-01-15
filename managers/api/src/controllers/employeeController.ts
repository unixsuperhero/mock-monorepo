import { Request, Response, NextFunction } from 'express';
import { EmployeeService } from '../services/employeeService';
import { CreateEmployeeDTO, UpdateEmployeeDTO } from '../models/Employee';

const employeeService = new EmployeeService();

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { department, role, status, page = 1, limit = 20 } = req.query;
    const employees = await employeeService.findAll({
      department: department as string,
      role: role as string,
      status: status as string,
      page: Number(page),
      limit: Number(limit),
    });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await employeeService.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: CreateEmployeeDTO = req.body;
    const employee = await employeeService.create(data);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: UpdateEmployeeDTO = req.body;
    const employee = await employeeService.update(req.params.id, data);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const terminateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const employee = await employeeService.terminate(req.params.id);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const getDirectReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await employeeService.findByManager(req.params.id);
    res.json(reports);
  } catch (error) {
    next(error);
  }
};
