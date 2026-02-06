import app from './app.js';
import { connectDB } from './db.js';
import { PORT } from './config.js';
import os from 'os';

// Función para obtener la IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // Skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

connectDB();

// Escuchar en todas las interfaces (0.0.0.0) para ser accesible desde la red
app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIP();
    console.log('═══════════════════════════════════════');
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log('═══════════════════════════════════════');
    console.log(`🌐 Web local:     http://localhost:${PORT}`);
    console.log(`📱 Móvil (red):   http://${localIP}:${PORT}`);
    console.log('═══════════════════════════════════════');
    console.log(`⚠️  Para app móvil, usa: http://${localIP}:${PORT}`);
    console.log('═══════════════════════════════════════\n');
});