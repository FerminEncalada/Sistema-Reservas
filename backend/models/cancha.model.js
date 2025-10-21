import mongoose from "mongoose";

const canchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    precioHora: {
        type: Number,
        required: true,
    },
    estado: {
        type: String,
        enum: ['disponible', 'ocupada', 'mantenimiento'],
    }
}, {
    timestamps: true
});

export default mongoose.model('Cancha', canchaSchema);