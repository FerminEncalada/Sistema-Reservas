import axios from './axios';

export const obtenerCanchas = () => axios.get('/canchas');

export const obtenerCancha = (id) => axios.get(`/canchas/${id}`);

export const crearCancha = (data) => {
  return axios.post("/canchas", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};


export const actualizarCancha = (id, data) => axios.put(`/canchas/${id}`, data);

export const eliminarCancha = (id) => axios.delete(`/canchas/${id}`);

export const obtenerDisponibilidad = (id, fecha) => 
    axios.get(`/canchas/${id}/disponibilidad?fecha=${fecha}`);