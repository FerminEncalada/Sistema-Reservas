import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import canchasRoutes from './routes/canchas.routes.js';
import reservasRoutes from './routes/reservas.routes.js';

const app = express();

// ⚠️ IMPORTANTE: Cambia esta IP por la tuya
const LOCAL_IP = '192.168.1.100'; // 👈 CAMBIAR ESTO

app.use(cors({
    origin: [
        'http://localhost:3001',           // Desarrollo web
        'capacitor://localhost',           // Capacitor iOS
        'http://localhost',                // Capacitor Android
        `http://${LOCAL_IP}:3001`,        // Red local web
        'ionic://localhost',               // Ionic
        'http://localhost:8100',           // Ionic serve
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', canchasRoutes);
app.use('/api', reservasRoutes);

export default app;