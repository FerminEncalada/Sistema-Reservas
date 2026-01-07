import app from './app.js';
import { connectDB } from './db.js';
import cors from 'cors';



connectDB();
app.listen(3000);
console.log("Servidor corriendo en puerto", 3000);


const corsOptions = {
    origin: 'http://localhost:3001', // Reemplaza con el origen permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions));