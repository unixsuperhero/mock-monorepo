import { Router } from 'express';
import { SearchService } from '../services/searchService';
import { authenticate } from '../middleware/auth';

export const searchRoutes = Router();
const searchService = new SearchService();

searchRoutes.get('/', authenticate, async (req, res, next) => {
  try {
    const { q, type, limit, offset } = req.query;
    const results = await searchService.search({
      query: q as string,
      type: type as 'customers' | 'orders' | 'all',
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    });
    res.json(results);
  } catch (error) {
    next(error);
  }
});

searchRoutes.get('/customers', authenticate, async (req, res, next) => {
  try {
    const { q } = req.query;
    const results = await searchService.searchCustomers(q as string);
    res.json(results);
  } catch (error) {
    next(error);
  }
});

searchRoutes.get('/orders', authenticate, async (req, res, next) => {
  try {
    const { q } = req.query;
    const results = await searchService.searchOrders(q as string);
    res.json(results);
  } catch (error) {
    next(error);
  }
});
