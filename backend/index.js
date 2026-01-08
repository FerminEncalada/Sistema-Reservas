import app from './app.js';
import { connectDB } from './db.js';


connectDB();
app.listen(3000);
console.log("Servidor corriendo en puerto", 3000);
