import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { customerRoutes } from './routes/customers';
import { orderRoutes } from './routes/orders';
import { authRoutes } from './routes/auth';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'customers-api' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Customers API running on port ${PORT}`);
});

export default app;
