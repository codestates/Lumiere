import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';
import {
  userRoutes,
  artistRoutes,
  productRoutes,
  orderRoutes,
  eventRoutes,
} from './routes/index.js';
import { errHandler, notFound } from './middleware/error.js';
import logger from './config/logger.js';

dotenv.config();
connectDB();

const combined =
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
// 기존 combined 포멧에서 timestamp만 제거
const morganFormat = process.env.NODE_ENV !== 'production' ? 'dev' : combined;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // qs
app.use(morgan(morganFormat, { stream: logger.stream })); // morgan 로그 설정

app.use(
  cors({
    origin: [
      'https://lumiereimage.s3.ap-northeast-2.amazonaws.com',
      'https://www.lumieregallery.site',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
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
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
export default server;
