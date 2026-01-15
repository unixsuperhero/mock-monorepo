import { Request, Response, NextFunction } from 'express';

export const validateBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields: string[] = [];

    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === null) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        missingFields,
      });
    }

    next();
  };
};

export const validateQuery = (requiredParams: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingParams: string[] = [];

    for (const param of requiredParams) {
      if (!req.query[param]) {
        missingParams.push(param);
      }
    }

    if (missingParams.length > 0) {
      return res.status(400).json({
        error: 'Missing required query parameters',
        missingParams,
      });
    }

    next();
  };
};
