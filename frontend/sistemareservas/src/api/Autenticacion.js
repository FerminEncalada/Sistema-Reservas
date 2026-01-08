import axios from './axios';

export const iniciosesion = (user) => axios.post('/login', user);

export const registro = (user) => axios.post('/register', user);

export const cerrarSesion = () => axios.post('/logout');

export const obtenerPerfil = () => axios.get('/profile');

export const obtenerUsuarios = () => axios.get('/users');

export const actualizarUsuario = (id, data) => axios.put(`/users/${id}`, data);
