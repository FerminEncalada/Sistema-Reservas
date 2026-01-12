import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.routes.js';
import canchasRoutes from './routes/canchas.routes.js';
import reservasRoutes from './routes/reservas.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());


app.use('/api', authRoutes);
app.use('/api', canchasRoutes);
app.use('/api', reservasRoutes);

export default app;