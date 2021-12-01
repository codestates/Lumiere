import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import { errHandler, notFound } from './middleware/error.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

app.get('/', (req, res) => {
  res.send('Lumiere API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/events', eventRoutes);

// custom handler for error
app.use(notFound);
app.use(errHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    colors.magenta.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  ),
);

export default server;
