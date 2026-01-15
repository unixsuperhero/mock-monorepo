import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { employeeRoutes } from './routes/employees';
import { inventoryRoutes } from './routes/inventory';
import { reportRoutes } from './routes/reports';
import { authRoutes } from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { requireRole } from './middleware/roleGuard';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/employees', requireRole(['admin', 'manager']), employeeRoutes);
app.use('/api/inventory', requireRole(['admin', 'manager', 'staff']), inventoryRoutes);
app.use('/api/reports', requireRole(['admin', 'manager']), reportRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'managers-api' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Managers API running on port ${PORT}`);
});

export default app;
