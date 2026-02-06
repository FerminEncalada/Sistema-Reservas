import axios from 'axios';

// ⚠️ IMPORTANTE: Cambia esta IP por la tuya
// Para encontrar tu IP:
// - Windows: abre CMD y escribe "ipconfig" (busca IPv4)
// - Mac/Linux: abre Terminal y escribe "ifconfig"
// Ejemplo: 192.168.1.100
const LOCAL_IP = '192.168.0.133'; //

// Detectar si estamos en la app móvil (Capacitor)
const isCapacitor = () => {
  return window.Capacitor !== undefined;
};

// Configurar la URL base según el entorno
const getBaseURL = () => {
  if (isCapacitor()) {
    // En móvil, usar la IP de tu computadora
    console.log('📱 Ejecutando en móvil');
    return `http://${LOCAL_IP}:3000/api`;
  } else {
    // En web, usar localhost
    console.log('🌐 Ejecutando en web');
    return 'http://localhost:3000/api';
  }
};

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para debugging (ver qué está pasando)
instance.interceptors.request.use(
  (config) => {
    console.log(`📡 Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Base URL:', config.baseURL);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} - ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('⏱️ Timeout: La petición tardó demasiado');
    } else if (error.message === 'Network Error') {
      console.error('🌐 Network Error: No se puede conectar al servidor');
      console.error(`Verifica que el backend esté corriendo en: http://${LOCAL_IP}:3000`);
    } else {
      console.error('❌ Response Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;