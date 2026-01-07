import axios from './axios';

export const iniciosesion = (user) => axios.post('/login', user);