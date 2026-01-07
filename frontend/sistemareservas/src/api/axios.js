import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esto a la URL de tu API
  withCredentials: true, // Si necesitas enviar cookies con las solicitudes
});

export default instance;