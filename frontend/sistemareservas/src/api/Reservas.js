import axios from './axios';

export const obtenerReservas = () => axios.get('/reservas');

export const obtenerReserva = (id) => axios.get(`/reservas/${id}`);

export const crearReserva = (data) => axios.post('/reservas', data);

export const actualizarReserva = (id, data) => axios.put(`/reservas/${id}`, data);

export const eliminarReserva = (id) => axios.delete(`/reservas/${id}`);