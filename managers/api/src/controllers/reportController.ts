import { Request, Response, NextFunction } from 'express';
import { ReportService } from '../services/reportService';
import { ReportPeriod } from '../models/Report';

const reportService = new ReportService();

export const getSalesReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { period = 'monthly', startDate, endDate } = req.query;
    const report = await reportService.generateSalesReport({
      period: period as ReportPeriod,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });
    res.json(report);
  } catch (error) {
    next(error);
  }
};

export const getInventoryReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const report = await reportService.generateInventoryReport();
    res.json(report);
  } catch (error) {
    next(error);
  }
};

export const getEmployeeReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { period = 'monthly', startDate, endDate } = req.query;
    const report = await reportService.generateEmployeeReport({
      period: period as ReportPeriod,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });
    res.json(report);
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stats = await reportService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export const exportReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type, format = 'csv' } = req.query;
    const data = await reportService.exportReport(
      type as string,
      format as 'csv' | 'xlsx' | 'pdf'
    );

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${type}-report.${format}`
    );
    res.send(data);
  } catch (error) {
    next(error);
  }
};
