import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import authRoute from './routes/index';
import errorHandler from './middlewares/error-handler.middleware';
import userRoute from './routes/user.router';
import productRoute from './routes/product.route';
import categoryRoute from './routes/category.route';
import orderRoute from './routes/order.route';
import clientRoute from './routes/client.route';

const app:Application = express();

// CORS Configuration
const corsOptions = {
    origin: ['*', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200,
    allowHeaders: 'Content-Type, Authorization, Origin, X-Requested-Width, Accept'
}

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 mins
//   max: 100, // limit each IP
//   message: 'Too many requests, please try again later.'
// });

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(limiter);
app.use(errorHandler);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users',  userRoute);
app.use('/api/v1/clients', clientRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/orders', orderRoute);

export default app;
 