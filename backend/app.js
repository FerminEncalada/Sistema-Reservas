import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import canchasRoutes from './routes/canchas.routes.js';
import reservasRoutes from './routes/reservas.routes.js';

const app = express();
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api', authRoutes);
app.use('/api', canchasRoutes);
app.use('/api', reservasRoutes);

export default app;